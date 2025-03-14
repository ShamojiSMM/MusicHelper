const MidiParser = {
  parse: function(input) {
    if (input instanceof Uint8Array) return MidiParser.Uint8(input);
    throw new Error("MidiParser.parse() : Invalid input provided");
  },

  Uint8: function(fileUnit8Array) {
    const file = {
      data: null,
      pointer: 0,
      movePointer: function(_bytes) {
        this.pointer += _bytes;
        return this.pointer;
      },

      readInt: function(_bytes) {
        _bytes = Math.min(_bytes, this.data.byteLength - this.pointer);

        if (_bytes < 1) return -1;
        let value = 0;

        if (_bytes > 1) {
          for (let i = 1; i < _bytes; i ++) {
            value += this.data.getUint8(this.pointer) * Math.pow(256, _bytes - i);
            this.pointer ++;
          }
        }

        value += this.data.getUint8(this.pointer);
        this.pointer ++;
        return value;
      },

      readStr: function(_bytes) {
        let text = "";

        for (let char = 1; char <= _bytes; char ++) text += String.fromCharCode(this.readInt(1));
        return text;
      },

      readRaw: function(_bytes) {
        let bytes = [];

        for (let char = 1; char <= _bytes; char ++) bytes.push(this.readInt(1));
        return bytes.join(" ");
      },

      readIntVLV: function() {
        let value = 0;

        if (this.pointer >= this.data.byteLength) {
          return -1;

        } else if (this.data.getUint8(this.pointer) < 128) {
          value = this.readInt(1);

        } else {
          const firstBytes = [];

          while (this.data.getUint8(this.pointer) >= 128) {
            firstBytes.push(this.readInt(1) - 128);
          }

          const lastByte = this.readInt(1);

          for (let dt = 1; dt <= firstBytes.length; dt ++) {
            value += firstBytes[firstBytes.length - dt] * Math.pow(128, dt);
          }

          value += lastByte;
        }

        return value;
      },
    };

    file.data = new DataView(
      fileUnit8Array.buffer,
      fileUnit8Array.byteOffset,
      fileUnit8Array.byteLength
    );

    if (file.readInt(4) != 0x4D546864) return false;
    file.readInt(4);

    const midi = {};
    midi.format = file.readInt(2);
    midi.trackNum = file.readInt(2);
    midi.tracks = [];

    const tickUnitByte1 = file.readInt(1);
    const tickUnitByte2 = file.readInt(1);

    if (tickUnitByte1 >= 128) {
      midi.tickUnit = [];
      midi.tickUnit[0] = tickUnitByte1 - 128;
      midi.tickUnit[1] = tickUnitByte2;

    } else {
      midi.tickUnit = tickUnitByte1 * 256 + tickUnitByte2;
    }

    for (let t = 0; t < midi.trackNum; t ++) {
      const track = midi.tracks[t] = { events: [] };
      const headerValidation = file.readInt(4);

      if (headerValidation == -1) break;
      if (headerValidation != 0x4D54726B) return false;

      file.readInt(4);
      let e = 0;
      let endOfTrack = false;

      let statusByte;
      let laststatusByte;

      let sumTick = 0;

      while (!endOfTrack) {
        const event = track.events[e] = {};

        const dt = file.readIntVLV();
        sumTick += dt;
        event.dt = dt;
        event.tick = sumTick;
        statusByte = file.readInt(1);

        if (statusByte == -1) break;
        else if (statusByte >= 128) laststatusByte = statusByte;
        else {
          statusByte = laststatusByte;
          file.movePointer(-1);
        }

        if (statusByte == 0xFF) {
          event.type = 0xFF;
          event.meta = file.readInt(1);

          const metaEventLength = file.readIntVLV();

          switch (event.meta) {
            case 0x2F:
            case -1:
              endOfTrack = true;
              break;

            case 0x01:
            case 0x02:
            case 0x03:
            case 0x04:
            case 0x05:
            case 0x07:
            case 0x06:
              event.data = file.readStr(metaEventLength);
              break;

            case 0x21:
            case 0x59:
            case 0x51:
              event.data = file.readInt(metaEventLength);
              break;

            case 0x54:
              event.data = [];
              event.data[0] = file.readInt(1);
              event.data[1] = file.readInt(1);
              event.data[2] = file.readInt(1);
              event.data[3] = file.readInt(1);
              event.data[4] = file.readInt(1);
              break;

            case 0x58:
              event.data = [];
              event.data[0] = file.readInt(1);
              event.data[1] = file.readInt(1);
              event.data[2] = file.readInt(1);
              event.data[3] = file.readInt(1);
              break;

            default:
              if (this.customInterpreter != null) {
                event.data = this.customInterpreter(event.meta, file, metaEventLength);
              }

              if (this.customInterpreter == null || !event.data) {
                file.readInt(metaEventLength);
                event.data = file.readInt(metaEventLength);
              }
          }

        } else {
          statusByte = statusByte.toString(16).split("");

          if (!statusByte[1]) statusByte.unshift("0");
          event.type = parseInt(statusByte[0], 16);
          event.ch = parseInt(statusByte[1], 16);

          switch (event.type) {
            case 0xF:
              if (this.customInterpreter != null) {
                event.data = this.customInterpreter(event.type, file, false);
              }

              if (this.customInterpreter == null || !event.data) {
                const eventLength = file.readIntVLV();
                event.data = file.readRaw(eventLength);
              }
              break;

            case 0xA:
            case 0xB:
            case 0xE:
            case 0x8:
            case 0x9:
              event.data = [];
              event.data[0] = file.readInt(1);
              event.data[1] = file.readInt(1);
              break;

            case 0xC:
            case 0xD:
              event.data = file.readInt(1);
              break;

            case -1:
              endOfTrack = true;
              break;

            default:
              if (this.customInterpreter != null) {
                event.data = this.customInterpreter(event.meta, file, false);
              }

              if (this.customInterpreter == null || !event.data) return false;
          }
        }

        e ++;
      }
    }

    return midi;
  },

  customInterpreter: null,
};