var languageIndex = 0;

if (window.navigator.language == "ja") {
  selectLanguage.selectedIndex = 0;

} else {
  selectLanguage.selectedIndex = 1;
  funLanguage(1);

  languageIndex = 1;
}

function funLanguage(selectedIndex) {
  document.querySelectorAll(".ja").forEach(elm => elm.style.display = ["inline", "none"][selectedIndex]);
  document.querySelectorAll(".en").forEach(elm => elm.style.display = ["none", "inline"][selectedIndex]);

  var shift = [-1, 1][selectedIndex];
  [selectLoopType, selectCycle, selectInstrument, selectTableInput, selectLoading, selectLoadingSpeedInput, selectLanding, selectTableInput.selectedIndex, selectSort].forEach(select => {
    select.selectedIndex += shift;
  });

  languageIndex = selectedIndex;
}

function isNum(...values) {
  if (!values.length) return false;
  for (var value of values) {
    if (value === 0) return true;
    if (["", null, Infinity, true, false].includes(value) || isNaN(value)) return false;
  }

  return true;
}

var magnifications = [4, 3, 2, 1.5, 1, 0.75, 0.5, 0.25, (4 / 3), (4 / 6), (4 / 12)];

function funBeatValue(beatValue) {
  if (beatValue == 0) {
    spanBpm.textContent = "";

    for (var i = 1; i < tableBeats.rows.length; i ++) {
      tableBeats.rows[i].cells[3].textContent = "";
    }

    return;
  }

  spanBpm.textContent = (3600 / beatValue).toFixed(3);

  for (var i = 1; i < tableBeats.rows.length; i ++) {
    tableBeats.rows[i].cells[3].textContent = (beatValue * magnifications[i - 1]).toFixed(3);
  }
}

function funBpm(bpm) {
  spanBeatValue.textContent = bpm == 0 ? "" : (3600 / bpm).toFixed(3);
}

function funBarValue() {
  if (isNum(inputBarBeatValue.value, inputSignature0.value, inputSignature0.value, inputBarNumber.value)) {
    spanBarValue.textContent = (inputBarNumber.value * (inputSignature0.value * ((4 * inputBarBeatValue.value) / inputSignature1.value))).toFixed(3);
  
  } else {
    spanBarValue.textContent = "";
  }
}

function funLoopType(loopType) {
  pLoopsText.style.display = [2, 3].includes(loopType) ? "none" : "inline-block";
}

function funLoop() {
  var loopValue = parseInt(inputLoop.value);
  var resultLoops = [];

  switch (selectLoopType.selectedIndex - languageIndex) {
    case 0:
      divSpecial.style.display = "none";

      for (var s = 0; s <= loopValue / 42; s ++) {
        for (var d = 0; d <= loopValue / 60; d ++) {
          for (var c = 0; c <= loopValue / 72; c ++) {
            for (var u = 0; u <= s / 3; u ++) {
              if (s * 42 + d * 60 + c * 72 + u * 2 == loopValue) {
                resultLoops.push(` (${s}, ${d}, ${c}, ${u}) `);
              }
            }
          }
        }
      }

      spanLoops.textContent = resultLoops.length ? resultLoops.reverse() : "Not Found";
      break;

    case 2:
      var subStraights = [1, 3, 3, 4, 3, 4, 3, 4, 4, 3, 3, 4, 4, 4, 3, 2, 4, 4, 1, 4, 4, 3, 4, 3, 4, 4, 4, 2, 4, 4, 1, 4, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4];
      var addStraights = parseInt(loopValue / 42) - subStraights[loopValue % 42];

      if (addStraights >= 0) {
        spanLoops.textContent = "";

        spanSpecial.textContent = addStraights;
        divSpecial.style.display = "block";
        imageLoop.style.width = "12rem";
        imageLoop.src = `images/tracks/base${loopValue % 42}.jpg`;

      } else {
        if ([90, 96].includes(loopValue)) {
          spanLoops.textContent = "";
          spanSpecial.textContent = "";

          divSpecial.style.display = "block";
          imageLoop.style.width = "12rem";
          imageLoop.src = `images/tracks/other${loopValue}.jpg`;

        } else {
          spanLoops.textContent = "Not Found";
          divSpecial.style.display = "none";
        }
      }
      break;

    case 4:
      divSpecial.style.display = "none";

      for (var s = 0; s <= loopValue / 21; s ++) {
        for (var d = 0; d <= loopValue / 30; d ++) {
          for (var c = 0; c <= loopValue / 36; c ++) {
            for (var u = 0; u <= s / 3; u ++) {
              if (s * 21 + d * 30 + c * 36 + u == loopValue && s % 2 == 0 && loopValue >= 72) {
                resultLoops.push(` (${s}, ${d}, ${c}, ${u}) `);
              }
            }
          }
        }
      }

      spanLoops.textContent = resultLoops.length ? resultLoops.reverse() : "Not Found";
      break;

    case 6:
      divSpecial.style.display = "none";

      for (var s = 0; s <= loopValue / 84; s ++) {
        for (var d = 0; d <= loopValue / 120; d ++) {
          for (var c = 0; c <= loopValue / 142; c ++) {
            for (var u = 0; u <= s / 2; u ++) {
              if (s * 84 + d * 120 + c * 142 + u * 2 == loopValue) {
                resultLoops.push(` (${s}, ${d}, ${c}, ${u}) `);
              }
            }
          }
        }
      }

      spanLoops.textContent = resultLoops.length ? resultLoops.reverse() : "Not Found";
      break;

    case 8:
      divSpecial.style.display = "none";

      for (var s = 0; s <= loopValue / 42; s ++) {
        for (var d = 0; d <= loopValue / 60; d ++) {
          for (var c = 0; c <= loopValue / 71; c ++) {
            for (var u = 0; u <= s / 2; u ++) {
              if (s * 42 + d * 60 + c * 71 + u == loopValue && s % 2 == 0 && loopValue >= 144) {
                resultLoops.push(` (${s}, ${d}, ${c}, ${u}) `);
              }
            }
          }
        }
      }

      spanLoops.textContent = resultLoops.length ? resultLoops.reverse() : "Not Found";
      break;

    case 6:
      divSpecial.style.display = "none";

      for (var s = 0; s <= loopValue / 84; s ++) {
        for (var d = 0; d <= loopValue / 120; d ++) {
          for (var c = 0; c <= loopValue / 142; c ++) {
            for (var u = 0; u <= s / 2; u ++) {
              if (s * 84 + d * 120 + c * 142 + u * 2 == loopValue) {
                resultLoops.push(` (${s}, ${d}, ${c}, ${u}) `);
              }
            }
          }
        }
      }

      spanLoops.textContent = resultLoops.length ? resultLoops.reverse() : "Not Found";
  }
}

function funCycle() {
  var straight = parseInt(inputCycleStraight.value || 0);
  var diagonal = parseInt(inputCycleDiagonal.value || 0);
  var curved = parseInt(inputCycleCurved.value || 0);
  var correction = parseInt(inputCycleCorrection.value || 0);

  var coefficients = [[42, 60, 72, 2], [21, 30, 36, 1], [84, 120, 142, 2], [42, 60, 71, 1]][(selectCycle.selectedIndex - languageIndex) / 2];

  spanCycle.textContent = coefficients[0] * straight + coefficients[1] * diagonal + coefficients[2] * curved + coefficients[3] * correction;
}

var tableWiringLength = 100;

var _atob = function(string) {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

  string = String(string.replace(/^.*?base64,/, "")).replace(/[\t\n\f\r ]+/g, "");
  
  if (!b64re.test(string)) throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");

  string += "==".slice(2 - (string.length & 3));
  var bitmap, result = "";
  var r1, r2, i = 0;

  for (; i < string.length; ) {
    bitmap = (b64.indexOf(string.charAt(i ++)) << 18) |
      (b64.indexOf(string.charAt(i ++)) << 12) |
      ((r1 = b64.indexOf(string.charAt(i ++))) << 6) |
      (r2 = b64.indexOf(string.charAt(i ++)));

    result += r1 == 64 ? String.fromCharCode((bitmap >> 16) & 255)
    : r2 == 64 ? String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255)
    : String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255, bitmap & 255);
  }
  
  return result;
}

var MidiParser = {
  debug: false,

  parse: function(input, _callback) {
    if (input instanceof Uint8Array) return MidiParser.Uint8(input);
    else if (typeof input == "string") return MidiParser.Base64(input);
    else if (input instanceof HTMLElement && input.type == "file") return MidiParser.addListener(input, _callback);
    else throw new Error("MidiParser.parse() : Invalid input provided");
  },

  addListener: function(_fileElement, _callback) {
    if (!File || !FileReader) throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");

    if (_fileElement == undefined || !(_fileElement instanceof HTMLElement)
      || _fileElement.tagName != "INPUT" || _fileElement.type.toLowerCase() != "file") return false;
    
    _callback = _callback || function() {};

    buttonLoadSmf.addEventListener("click", function() {
      if (!inputSmf.files.length) return false;

      var reader = new FileReader();
      reader.readAsArrayBuffer(inputSmf.files[0]);

      reader.onload = function(e) {
        _callback(MidiParser.Uint8(new Uint8Array(e.target.result)));
      };
    });
  },

  Base64: function(b64String) {
    b64String = String(b64String);

    var raw = _atob(b64String);
    var rawLength = raw.length;
    var t_array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i ++) t_array[i] = raw.charCodeAt(i);
    return MidiParser.Uint8(t_array);
  },

  Uint8: function(FileAsUint8Array) {
    var file = {
      data: null,
      pointer: 0,
      movePointer: function(_bytes) {
        this.pointer += _bytes;
        return this.pointer;
      },

      readInt: function(_bytes) {
        _bytes = Math.min(_bytes, this.data.byteLength - this.pointer);

        if (_bytes < 1) return -1;
        var value = 0;

        if (_bytes > 1) {
          for (var i = 1; i <= _bytes - 1; i ++) {
            value += this.data.getUint8(this.pointer) * Math.pow(256, _bytes - i);
            this.pointer ++;
          }
        }

        value += this.data.getUint8(this.pointer);
        this.pointer ++;
        return value;
      },

      readStr: function(_bytes) {
        var text = "";

        for (var char = 1; char <= _bytes; char ++) text += String.fromCharCode(this.readInt(1));
        return text;
      },

      readIntVLV: function() {
        var value = 0;

        if (this.pointer >= this.data.byteLength) {
          return -1;

        } else if (this.data.getUint8(this.pointer) < 128) {
          value = this.readInt(1);

        } else {
          var FirstBytes = [];

          while (this.data.getUint8(this.pointer) >= 128) {
            FirstBytes.push(this.readInt(1) - 128);
          }

          var lastByte = this.readInt(1);

          for (var dt = 1; dt <= FirstBytes.length; dt ++) {
            value += FirstBytes[FirstBytes.length - dt] * Math.pow(128, dt);
          }

          value += lastByte;
        }

        return value;
      },
    };

    file.data = new DataView(
      FileAsUint8Array.buffer,
      FileAsUint8Array.byteOffset,
      FileAsUint8Array.byteLength
    );

    if (file.readInt(4) != 0x4d546864) {
      return false;
    }

    file.readInt(4);

    var MIDI = {};
    MIDI.formatType = file.readInt(2);
    MIDI.trackNum = file.readInt(2);
    MIDI.tracks = [];

    var timeUnitByte1 = file.readInt(1);
    var timeUnitByte2 = file.readInt(1);
    
    if (timeUnitByte1 >= 128) {
      MIDI.timeUnit = [];
      MIDI.timeUnit[0] = timeUnitByte1 - 128;
      MIDI.timeUnit[1] = timeUnitByte2;
    
    } else {
      MIDI.timeUnit = timeUnitByte1 * 256 + timeUnitByte2;
    }

    for (var t = 1; t <= MIDI.trackNum; t ++) {
      MIDI.tracks[t - 1] = { events: [] };
      var headerValidation = file.readInt(4);

      if (headerValidation == -1) break;
      if (headerValidation != 0x4d54726b) return false;
      
      file.readInt(4);
      var e = 0;
      var endOfTrack = false;

      var statusByte;
      var laststatusByte;

      while (!endOfTrack) {
        e ++;
        MIDI.tracks[t - 1].events[e - 1] = {};
        MIDI.tracks[t - 1].events[e - 1].deltaTime = file.readIntVLV();
        statusByte = file.readInt(1);

        if (statusByte == -1) break;
        else if (statusByte >= 128) laststatusByte = statusByte;
        else {
          statusByte = laststatusByte;
          file.movePointer(-1);
        }

        if (statusByte == 0xff) {
          MIDI.tracks[t - 1].events[e - 1].type = 0xff;
          MIDI.tracks[t - 1].events[e - 1].metaType = file.readInt(1);
          
          var metaEventLength = file.readIntVLV();
          
          switch (MIDI.tracks[t - 1].events[e - 1].metaType) {
            case 0x2f:
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
              MIDI.tracks[t - 1].events[e - 1].data = file.readStr(metaEventLength);
              break;

            case 0x21:
            case 0x59:
            case 0x51:
              MIDI.tracks[t - 1].events[e - 1].data = file.readInt(metaEventLength);
              break;

            case 0x54:
              MIDI.tracks[t - 1].events[e - 1].data = [];
              MIDI.tracks[t - 1].events[e - 1].data[0] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[1] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[2] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[3] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[4] = file.readInt(1);
              break;

            case 0x58:
              MIDI.tracks[t - 1].events[e - 1].data = [];
              MIDI.tracks[t - 1].events[e - 1].data[0] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[1] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[2] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[3] = file.readInt(1);
              break;

            default:
              if (this.customInterpreter != null) {
                MIDI.tracks[t - 1].events[e - 1].data = this.customInterpreter(
                  MIDI.tracks[t - 1].events[e - 1].metaType, file, metaEventLength);
              }

              if (this.customInterpreter == null || !MIDI.tracks[t - 1].events[e - 1].data) {
                file.readInt(metaEventLength);
                MIDI.tracks[t - 1].events[e - 1].data = file.readInt(metaEventLength);
              }
          }

        } else {
          statusByte = statusByte.toString(16).split("");

          if (!statusByte[1]) statusByte.unshift("0");
          MIDI.tracks[t - 1].events[e - 1].type = parseInt(statusByte[0], 16);
          MIDI.tracks[t - 1].events[e - 1].channel = parseInt(statusByte[1], 16);

          switch (MIDI.tracks[t - 1].events[e - 1].type) {
            case 0xf: 
              if (this.customInterpreter != null) {
                MIDI.tracks[t - 1].events[e - 1].data = this.customInterpreter(
                  MIDI.tracks[t - 1].events[e - 1].type, file, false);
              }

              if (this.customInterpreter == null || !MIDI.tracks[t - 1].events[e - 1].data) {
                var eventLength = file.readIntVLV();
                MIDI.tracks[t - 1].events[e - 1].data = file.readInt(eventLength);
              }
              break;
            
            case 0xa:
            case 0xb:
            case 0xe:
            case 0x8:
            case 0x9:
              MIDI.tracks[t - 1].events[e - 1].data = [];
              MIDI.tracks[t - 1].events[e - 1].data[0] = file.readInt(1);
              MIDI.tracks[t - 1].events[e - 1].data[1] = file.readInt(1);
              break;

            case 0xc:
            case 0xd:
              MIDI.tracks[t - 1].events[e - 1].data = file.readInt(1);
              break;

            case -1:
              endOfTrack = true;
              break;

            default:
              if (this.customInterpreter != null) {
                MIDI.tracks[t - 1].events[e - 1].data = this.customInterpreter(
                  MIDI.tracks[t - 1].events[e - 1].metaType, file, false);
              }

              if (this.customInterpreter == null || !MIDI.tracks[t - 1].events[e - 1].data) return false;
          }
        }
      }
    }

    return MIDI;
  },

  customInterpreter: null,
};

if (typeof module != "undefined") module.exports = MidiParser;
else {
  var _global = (typeof window == "object" && window.self == window && window)
  || (typeof self == "object" && self.self == self && self)
  || (typeof global == "object" && global.global == global && global);

  _global.MidiParser = MidiParser;
}

MidiParser.parse(inputSmf, (midiData) => {
  if (!midiData) {
    alert(["SMFが無効かもです。", "Invalid SMF."][languageIndex]);
    return;
  }

  if (midiData.formatType != 1) {
    alert(["フォーマット1しか対応してません。申し訳ない...", "Sorry, we only support Format 1."][languageIndex]);
    return;
  }

  var timeUnit = midiData.timeUnit;

  var track = midiData.tracks[selectTrack.selectedIndex]; 
  var notes = [];

  if (!track) {
    alert(["トラックがありません。", "There is no such track."][languageIndex]);
    return;    
  }

  for (var event of track.events) {
    var type = event.type;
    var data = event.data;

    if (type == 255 && event.metaType == 1) {
      if (data == "MMstart") {
        notes = [];
        continue;
      }
      
      if (data == "MMend") break;
    }

    if (notes.length) notes[notes.length - 1].time += event.deltaTime;
    if (type == 9 && data[1] > 0) {
      notes.push({time: 0, key: data[0]});
      continue;
    }    
  }
 
  if (!notes.length) {
    alert(["そのトラックにはなんもありません。", "That track is empty."][languageIndex]);
    return;
  }

  notes[notes.length - 1].time = timeUnit;
  var baseKey = notes[0].key;

  selectTableInput.selectedIndex = languageIndex;
  inputTimeUnit.value = timeUnit;

  funStopPlay();

  for (var i = 2; i <= 4; i ++) {
    for (var j = 1; j <= tableWiringLength; j ++) {
      tableInput.rows[i].cells[j].textContent = "";
    }
  }

  notes.forEach((event, i) => {
    if (i >= tableWiringLength) return;

    tableInput.rows[2].cells[i + 1].textContent = event.time;
    tableInput.rows[4].cells[i + 1].textContent = event.key - baseKey;
  });

  funTimeUnit(timeUnit);
});

var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

for (var i = 27; i >= 0; i --) {
  var option = document.createElement("option");
  
  var octave = 1;
  if (i >= 12) octave = i >= 24 ? 3 : 2;

  option.text = `${octave}-${keys[i % 12]}`;
  selectScale.appendChild(option);
}

selectScale.selectedIndex = 15;

document.querySelectorAll(".tableWirings").forEach(table => {
  table.style.width = `${tableWiringLength * 4}rem`;
});

for (var i = 1; i <= tableWiringLength; i ++) {
  var th0 = document.createElement("th");
  th0.textContent = i;
  tableInput.rows[0].appendChild(th0);

  var th1 = document.createElement("th");
  th1.textContent = i;
  tableWiring.rows[0].appendChild(th1);

  var th2 = document.createElement("th");
  th2.textContent = i;
  tableSort.rows[0].appendChild(th2);

  for (var j = 1; j <= 4; j ++) {
    var cell = tableInput.rows[j].insertCell();
    cell.contentEditable = true;

    if (j == 2) cell.addEventListener("input", funNote);
  }

  tableWiring.rows[1].insertCell().contentEditable = true;
  tableWiring.rows[2].insertCell().contentEditable = true;

  if (i >= 2) {
    tableWiring.rows[3].insertCell().contentEditable = true;
    tableWiring.rows[4].insertCell().contentEditable = true;
    tableWiring.rows[5].insertCell().contentEditable = true;
  }

  tableSort.rows[1].insertCell().contentEditable = true;
  tableSort.rows[2].insertCell();
  tableSort.rows[3].insertCell();
  tableSort.rows[4].insertCell();

  var buttonCell = tableSort.rows[5].insertCell();

  var button = document.createElement("button");
  button.style = "width: 3.4rem; height: 1.5rem;";
  button.addEventListener("click", funTableButton);

  buttonCell.style.textAlign = "center";
  buttonCell.style.varticalAlign = "middle";
  buttonCell.appendChild(button);
}

document.querySelectorAll(".tableWirings td").forEach(table => {
  table.addEventListener("blur", event => event.target.scrollLeft = 0);
});

var arrows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

tableInput.addEventListener("keydown", event => {
  if (event.ctrlKey) {
    var row = event.target.parentNode.rowIndex;
    var cell = event.target.cellIndex;

    var shifts = [[0, 1], [0, -1], [-1, 0], [1, 0]][arrows.indexOf(event.key)];
    if (!shifts) return;

    var destination = tableInput.rows[row + shifts[0]].cells[cell + shifts[1]];
    destination.focus();
  }
});

tableWiring.addEventListener("keydown", event => {
  if (!event.ctrlKey) return;

  var row = event.target.parentNode.rowIndex;
  var cell = event.target.cellIndex;
  
  var shifts = [[0, 1], [0, -1], [-(selectLoading.selectedIndex == 3 ? 1 : (row == 5 ? 2 : 1)), 0], [(selectLoading.selectedIndex == 3 ? 1 : (row == 3 ? 2 : 1)), 0]][arrows.indexOf(event.key)];
  if (!shifts) return;
  
  var destination = tableWiring.rows[row + shifts[0]].cells[cell + shifts[1]];
  destination.focus();
});

tableSort.addEventListener("keydown", event => {
  if (!event.ctrlKey) return;
  
  var row = event.target.parentNode.rowIndex;
  var cell = event.target.cellIndex;
  
  var shift = [1, -1][arrows.indexOf(event.key)];
  if (!shift) return;
  
  var destination = tableSort.rows[row].cells[cell + shift];
  destination.focus();
});

function funTableBeat(tableBeatValue) {
  var bpm = 3600 / tableBeatValue;
  spanTableBpm.textContent = isFinite(bpm) ? bpm.toFixed(3) : "";

  for (var i = 1; i <= tableWiringLength; i ++) {
    funNote(i);
  }
}

function funTableInput() {
  [2, 3].forEach(i => {
    for (var j = 1; j <= tableWiringLength; j ++) {
      tableInput.rows[i].cells[j].textContent = "";
    }
  });

  divTimeUnit.style.display = ["block", "none"][selectTableInput.selectedIndex];
}

function funTimeUnit() {
  for (var i = 1; i <= tableWiringLength; i ++) {
    funNote(i);
  }
}

function funNote(cellIndex) {
  var beat = inputTableBeat.value;

  if (selectTableInput.selectedIndex - languageIndex == 0) {
    var cellIndex = isNum(cellIndex) ? cellIndex : this.cellIndex;
    var timeUnit = parseInt(inputTimeUnit.value);
    var targetTime = tableInput.rows[2].cells[cellIndex].textContent;
    
    if (!timeUnit || !beat || targetTime == "") {
      tableInput.rows[3].cells[cellIndex].textContent = "";
      return;
    }

    tableInput.rows[3].cells[cellIndex].textContent = beat * (targetTime / timeUnit);

  } else {
    var target = isNum(cellIndex) ? tableInput.rows[2].cells[cellIndex] : this;
    var parts = target.textContent.match(/[\+\-]*\d+(?:\.\d+)?\:*/g);
  
    if (target.textContent == "" || !beat || !parts) {
      tableInput.rows[3].cells[target.cellIndex].textContent = "";
      return;
    }
  
    var calNotes = 0;
        
    parts.forEach(part => {
      var note = beat * 4 / part.replace(/[\+\-\:]/g, "");
      note = 2 * note - note * (2 ** -(part.match(/\:/g) || []).length);
  
      calNotes += (part.startsWith("-") ? -1 : 1) * note;
    });
  
    tableInput.rows[3].cells[target.cellIndex].textContent = isFinite(calNotes) ? calNotes : "";
  }
}

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var instruments = ["sine", "triangle", "square", "sawtooth"];
var soundData = [];

for (var i = 0; i < selectInstrument.options.length / 2 - 4; i ++) {
  (function(i) {
    var xml = new XMLHttpRequest();
    xml.responseType = "arraybuffer";
    xml.open("GET", `sounds/sound${i}.mp3`, true);
  
    xml.onload = function() {
      audioContext.decodeAudioData(xml.response, (data) => {
        soundData[i] = data;
      });
    };
  
    xml.send();
  })(i);
}

function funPlaySound(column) {
  if (selectInstrument.selectedIndex <= 7) {
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();

    oscillator.type = instruments[(selectInstrument.selectedIndex - languageIndex) / 2];
    oscillator.frequency.setValueAtTime(440 * (2 ** ((18 - selectScale.selectedIndex + parseFloat(tableInput.rows[4].cells[column].textContent)) / 12)), audioContext.currentTime);
    oscillator.connect(gainNode);      

    gainNode.gain.value = 0.2;     
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);

  } else {
    var bufferSource = audioContext.createBufferSource();
    var gainNode = audioContext.createGain();

    bufferSource.buffer = soundData[(selectInstrument.selectedIndex - languageIndex) / 2 - 4];
    bufferSource.playbackRate.value = 2 ** ((18 - selectScale.selectedIndex + parseInt(tableInput.rows[4].cells[column].textContent)) / 12);
    bufferSource.connect(gainNode);

    gainNode.gain.value = 0.45;
    gainNode.connect(audioContext.destination);

    bufferSource.start(0);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.6);
  }
}

var stopFlag = false;

function funResetPlay() {
  for (var j = 1; j <= tableWiringLength; j ++) {
    tableInput.rows[0].cells[j].style.backgroundColor = "#ffffe0";
  }
}

var timeoutId;

function funPlay() {
  stopFlag = false;
  
  var loop = () => {
    if (stopFlag) return;

    if (i > tableWiringLength) {
      funResetPlay();
      return;
    }

    var delay = tableInput.rows[3].cells[i].textContent;
    var height = tableInput.rows[4].cells[i].textContent;

    if (!isNum(delay, height)) {
      funResetPlay();
      return;
    }

    if (isNum(height)) funPlaySound(i);
    if (i >= 2) tableInput.rows[0].cells[i - 1].style.backgroundColor = "#ffffe0";
    tableInput.rows[0].cells[i].style.backgroundColor = "#98fb98";
    i ++;

    timeoutId = setTimeout(loop, delay * 50 / 3);
  }

  var i = 1;
  loop();
}

function funStopPlay() {
  stopFlag = true;

  funResetPlay();
  clearTimeout(timeoutId);
}

function funLoading(selectedIndex) {
  divLoadingSpeedCycle.style.display = "none";

  switch ((selectedIndex - languageIndex) / 2) {
    case 0:
    case 1:
      divLoadingSpeedAverage.style.display = "none";
      selectLoadingSpeedInput.style.display = "none";

      tableWiring.rows[4].style.display = "none";
      break;

    case 2:
      divLoadingSpeedAverage.style.display = "block";
      selectLoadingSpeedInput.style.display = "none";

      tableWiring.rows[4].style.display = "none";
      break;
    
    case 3:
      divLoadingSpeedAverage.style.display = "block";
      selectLoadingSpeedInput.style.display = "inline-block";
      selectLoadingSpeedInput.selectedIndex = 2 + languageIndex;

      tableWiring.rows[4].style.display = "table-row";
  }
}

function funLoadingSpeedInput(selectedIndex) {
  switch ((selectedIndex - languageIndex) / 2) {
    case 0:
      divLoadingSpeedAverage.style.display = "none";
      divLoadingSpeedCycle.style.display = "none";
      break;

    case 1: 
      divLoadingSpeedCycle.style.display = "none";
      divLoadingSpeedAverage.style.display = "block";
      break;

    case 2:
      divLoadingSpeedAverage.style.display = "none";
      divLoadingSpeedCycle.style.display = "block";
  }
}

function funLanding(selectedIndex) {
  var firstCorrection = "";
  var correctionPattern = [];

  switch (selectedIndex) {
    case 2:
      firstCorrection = 8;
      correctionPattern = [11, 11, 10];
      break;
    
    case 3:
      firstCorrection = 11;
      correctionPattern = [11, 10, 11];
      break;

    case 4:
      firstCorrection = 11;
      correctionPattern = [10, 11, 11];
      break;

    case 5:
      firstCorrection = 10;
      correctionPattern = [11, 11, 10];
  }

  for (var i = 2; i <= tableWiringLength; i ++) {
    if (i == 2) {
      tableWiring.rows[3].cells[2].textContent = firstCorrection;

    } else {
      tableWiring.rows[3].cells[i].textContent = correctionPattern[i % 3];
    }
  }
}

function funLoadingSpeedAverage(loadingSpeed) {
  if (selectLoading.selectedIndex - languageIndex == 6) {
    if (loadingSpeed != "") {
      for (var i = 2; i <= tableWiringLength; i ++) {
        tableWiring.rows[4].cells[i].textContent = parseFloat(loadingSpeed);
      }

    } else {
      for (var i = 2; i <= tableWiringLength; i ++) {
        tableWiring.rows[4].cells[i].textContent = "";
      }
    }
  }
}

function funLoadingSpeedCycle(loadingSpeeds) {
  if (loadingSpeeds == "") {
    for (var i = 2; i <= tableWiringLength; i ++) {
      tableWiring.rows[4].cells[i].textContent = "";
    }
  
    return;
  }
  
  var loadingSpeeds = loadingSpeeds.split(",").map(speed => parseFloat(speed));
  
  for (var i = 2; i <= tableWiringLength; i ++) {
    tableWiring.rows[4].cells[i].textContent = (loadingSpeeds[(i - 2) % loadingSpeeds.length]);
  }
}

function funAllocation() {
  var totalDelay = 0;

  for (var i = 1; i <= tableWiringLength; i ++) {
    tableWiring.rows[2].cells[i].textContent = "";
    tableWiring.rows[5].cells[i].textContent = "";

    var delay = tableInput.rows[3].cells[i].textContent;
    var height = tableInput.rows[4].cells[i].textContent;

    if (isNum(delay, height)) {
      tableWiring.rows[2].cells[i].textContent = totalDelay;
      tableWiring.rows[5].cells[i].textContent = parseInt(height);

      totalDelay += parseFloat(delay);
    }
  }
}

function isWirable(target, height) {
  var near = 0, far = 0;
  target = Math.round(target);

  for (var i = 0; i < startingList.length; i ++) {
    var starting = startingList[i];
    if (starting.delay > target + 13 || starting.down >= height) continue;

    for (var j = 0; j < gapList.length; j ++) {
      var gap0 = gapList[j];
      if (starting.delay + gap0.delay > target + 13 || starting.down + gap0.down >= height) continue;

      for (var k = 0; k < gapList.length; k ++) {
        var gap1 = gapList[k];
        if (starting.delay + gap0.delay + gap1.delay > target + 13 || starting.down + gap0.down + gap1.down >= height) continue;

        for (var l = 0; l < gapList.length; l ++) {
          var gap2 = gapList[l];
          var distance = height - (starting.down + gap0.down + gap1.down + gap2.down);

          if (distance <= 0) continue;

          var totalDelay = starting.delay + gap0.delay + gap1.delay + gap2.delay - (distance <= accelerations.length ? accelerations[distance - 1] : 0);
          
          switch (Math.abs(target - totalDelay)) {
            case 0:
              return 0;

            case 1:
              near = 1;
              break;

            case 2:
              far = 1;
          }
        }
      }
    }
  }

  if (near == 1) return 1;
  if (far == 1) return 2;
  return 3;
}

var sortableRange = 4;

function funWiringSort() {
  var totalXDelay = 0;
  var wirings = [];

  for (var i = 1; i <= tableWiringLength; i ++) {
    var delay = tableWiring.rows[2].cells[i].textContent;
    var xDelay = tableWiring.rows[3].cells[i].textContent;

    var xScrollDelay = selectLoading.selectedIndex - languageIndex == 6 ? tableWiring.rows[4].cells[i].textContent : 0;
    var yScrollDelay = 0;
    
    switch ((selectLoading.selectedIndex - languageIndex) / 2) {
      case 1:
        yScrollDelay = -4;
        break;
      
      case 2:
        yScrollDelay = parseFloat(inputLoadingSpeedAverage.value);
    }

    var height = parseInt(tableWiring.rows[5].cells[i].textContent);

    var baseDelay = inputBaseDelay.value;
    var baseHeight = parseInt(inputBaseHeight.value) - parseInt(tableWiring.rows[5].cells[1].textContent);

    if (!isNum(delay, xDelay, xScrollDelay, height, baseDelay, baseHeight)) break;

    totalXDelay += (parseFloat(xDelay) + parseFloat(xScrollDelay));
    wirings.push({index: i, delay: parseFloat(baseDelay) + parseFloat(delay) - parseInt(height) * (yScrollDelay + 4), xDelay: totalXDelay, height: baseHeight + height});
  }

  if (!wirings.length) {
    funRemoveOverview();
    return;
  }

  var evals = [];

  for (var i = 0; i < wirings.length; i ++) {
    evals[i] = evals[i] ?? isWirable(wirings[i].delay - wirings[i].xDelay, wirings[i].height);        
    if (evals[i] == 0) continue;

    var backI = wirings.length - 1 - i;
    var shifts = [];

    for (var num = 1; num <= sortableRange; num ++) {
      if (i >= num) shifts.push(-num);
      if (backI >= num) shifts.push(num);
    };

    var movedEvals = [];
    var evalSums = [];

    shifts.forEach(shift => {
      if (shift > 0) evals[i + shift] = evals[i + shift] ?? isWirable(wirings[i + shift].delay - wirings[i + shift].xDelay, wirings[i + shift].height);
    
      var current = isWirable(wirings[i].delay - wirings[i + shift].xDelay, wirings[i].height);
      var destination = isWirable(wirings[i + shift].delay - wirings[i].xDelay, wirings[i + shift].height);
    
      movedEvals.push({shift, current, destination});
      evalSums.push(current + destination);
    });

    var movedEval = movedEvals[evalSums.indexOf(Math.min(...evalSums))];
    var shift = movedEval.shift;
    var current = movedEval.current;
    var destination = movedEval.destination;

    if (current + destination < evals[i] + evals[i + shift]) {
      [wirings[i], wirings[i + shift]] = [wirings[i + shift], wirings[i]];
      [wirings[i].xDelay, wirings[i + shift].xDelay] = [wirings[i + shift].xDelay, wirings[i].xDelay];
      
      evals[i] = destination;
      evals[i + shift] = current;
    }
  }

  for (var i = 2; i <= 4; i ++) {
    for (var j = 1; j <= tableWiringLength; j ++) tableSort.rows[i].cells[j].textContent = "";
  }

  for (var i = 1; i <= wirings.length; i ++) {
    var th = tableSort.rows[0].cells[i];
    var movedInd = wirings[i - 1].index;
    th.textContent = movedInd;
    th.style.backgroundColor = i == movedInd ? "#ffffe0" : "#ffedc4";

    tableSort.rows[2].cells[i].textContent = Math.round(wirings[i - 1].delay - wirings[i - 1].xDelay);
    tableSort.rows[3].cells[i].textContent = wirings[i - 1].height;
    tableSort.rows[4].cells[i].textContent = ["◎", "○", "△", "×"][evals[i - 1]];
  }

  var evalsCount = [0, 0, 0, 0];
  evals.forEach(e => evalsCount[e] ++);
  spanEvaluations.textContent = `◎: ${evalsCount[0]}, ○: ${evalsCount[1]}, △: ${evalsCount[2]}, ×: ${evalsCount[3]}`;

  if (canvasOverview.height > 0) {
    funOverview();
  }
}

var selectedButton = 0;

function funTableButton() {
  if (selectedButton != 0) tableSort.rows[5].cells[selectedButton].firstChild.style.backgroundColor = "";

  var button = this;
  var cellIndex = button.parentNode.cellIndex;
  selectedButton = cellIndex;
  
  button.style.backgroundColor = "#a8fb98";

  var target = tableSort.rows[2].cells[cellIndex].textContent;
  var height = tableSort.rows[3].cells[cellIndex].textContent;

  if (isNum(target, height)) {
    inputTarget.value = target;
    inputHeight.value = height;
    
    funTarget();
  }
}

document.addEventListener("keydown", e => {
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
    if (selectedButton == 0) return;
    
    var shift = e.key == "ArrowLeft" ? -1 : 1;
    tableSort.rows[5].cells[selectedButton + shift].firstChild.click();
  }
});

function funOverview() {
  var heights = [];

  for (var i = 1; i <= tableWiringLength; i ++) {
    var height = tableSort.rows[3].cells[i].textContent;

    if (!isNum(height)) break;
    heights.push(height);
  }

  if (!heights.length) return;
  divOverview.style.display = "block";

  var maxHeight = Math.max(...heights);
  var tileX = heights.length;
  var tileY = maxHeight - Math.min(...heights) + 3;

  canvasOverview.width = 16 * tileX;
  canvasOverview.height = 16 * tileY;

  var distances = heights.map(height => maxHeight - height);
  var context = canvasOverview.getContext("2d");

  var space = new Image();
  space.src = `images/railParts/space.png`;

  space.onload = () => {
    context.globalAlpha = 0.6;

    for (var x = 0; x < tileX; x ++) {
      for (var y = 0; y < tileY; y ++) {
        context.drawImage(space, 16 * x, 16 * y, 16, 16);
      }
    }

    context.globalAlpha = 1;
  }

  var parts = [];

  for (var i = 0; i <= 2; i ++) {
    parts[i] = new Image();
    parts[i].src = `images/railParts/${["openU", "note", "openD"][i]}.png`;
  };

  parts[2].onload = () => {
    distances.forEach((distance, x) => {
      for (var i = 0; i <= 2; i ++) {
        context.drawImage(parts[i], 16 * x, 16 * (distance + i), 16, 16);
      }
    });

    context.imageSmoothingEnabled = false;
  }
}

function funRemoveOverview() {
  canvasOverview.height = 0;
  divOverview.style.display = "none";

  spanOverview.textContent = "";
}

function funColumnOverviw(event) {
  var x = event.clientX - event.target.getBoundingClientRect().left;

  if (x < 0) x = 0;
  if (x > canvasOverview.width) x = canvasOverview.width;

  return parseInt(x / 16) + 1;
}

canvasOverview.addEventListener("click", event => {
  var column = funColumnOverviw(event);

  var delay = tableSort.rows[2].cells[column].textContent;
  var height = tableSort.rows[3].cells[column].textContent;
  var key = selectScale.options[selectScale.selectedIndex - (height - parseInt(inputBaseHeight.value))].text;

  var title = `
    ${["列", "Column"][languageIndex]}: ${column}, 
    ${["音階", "Key"][languageIndex]}: ${key}, 
    ${["遅延", "Delay"][languageIndex]}: ${delay}, 
    ${["高さ", "Height"][languageIndex]}: ${height}
  `;

  spanOverview.textContent = title;
  tableSort.rows[5].cells[column].firstChild.click();
});

function funTarget() {
  resultsSame = [], resultsNear = [], resultsFar = [];

  var target = parseInt(inputTarget.value);
  var height = parseInt(inputHeight.value);
  if (!isNum(target, height)) return;

  for (var i = 0; i < startingList.length; i ++) {
    var starting = startingList[i];
    if (starting.delay > target + 13 || starting.down >= height) continue;

    for (var j = 0; j < gapList.length; j ++) {
      var gap0 = gapList[j];
      if (starting.delay + gap0.delay > target + 13 || starting.down + gap0.down >= height) continue;

      for (var k = 0; k < gapList.length; k ++) {
        var gap1 = gapList[k];
        if (starting.delay + gap0.delay + gap1.delay > target + 13 || starting.down + gap0.down + gap1.down >= height) continue;

        for (var l = 0; l < gapList.length; l ++) {
          var gap2 = gapList[l];
          var distance = height - (starting.down + gap0.down + gap1.down + gap2.down);

          if (distance <= 0) continue;

          var totalDelay = starting.delay + gap0.delay + gap1.delay + gap2.delay - (distance <= accelerations.length ? accelerations[distance - 1] : 0);
          var targetResult = {delay: totalDelay, down: starting.down + gap0.down + gap1.down + gap2.down, up: starting.up, disp: `${starting.disp}${gap0.disp}${gap1.disp}${gap2.disp}`};

          var error = Math.abs(target - totalDelay);
          if (error <= 2) [resultsSame, resultsNear, resultsFar][error].push(targetResult);
        }
      }
    }
  } 

  funSort();
}

function funSort() {
  var sorting = (selectSort.selectedIndex - languageIndex) / 2;
  var direction = sorting <= 1 ? 0 : 1;
  var order = sorting % 2 == 0 ? 1 : -1;

  var resultsList = [resultsSame, resultsNear, resultsFar];

  [resultsSame, resultsNear, resultsFar] = resultsList.map(results => {
    return results.sort((a, b) => {
      var [a0, a1] = [[a.up, a.down], [a.up, a.down]][direction];
      var [b0, b1] = [[b.up, b.down], [b.up, b.down]][direction];

      if (a0 > b0) return order;
      if (a0 < b0) return -order;
    
      if (a1 > b1) return order;
      if (a1 < b1) return -order;
    
      return 0;
    });
  });

  var newResultsSame = [], newResultsNear = [], newResultsFar = [];
  var newResultsList = [newResultsSame, newResultsNear, newResultsFar];

  [resultsSame, resultsNear, resultsFar].forEach((results, i) => {
    results.forEach(result => {
      newResultsList[i].push(` (${result.delay}/${parseInt(result.up)}/${result.down}/${result.disp})`);
    });
  });

  newResultsSame = Array.from(new Set(newResultsSame));
  newResultsNear = Array.from(new Set(newResultsNear));
  newResultsFar = Array.from(new Set(newResultsFar));

  [divSame, divNear, divFar].forEach((div, i) => {
    while (div.firstChild) div.removeChild(div.firstChild);

    [newResultsSame, newResultsNear, newResultsFar][i].forEach(result => {
      var span = document.createElement("span");
      span.textContent = `${result},`;

      span.addEventListener("click", function(event) {
        var str = event.target.textContent.match(/[↑↓][^)]+\)/)[0].replace(")", "");
      
        var direction = str[0];
        var optsList = [];
        var parts = [];
        var partsIndex = ["noteU", "noteD", "space", "openU", "openD", "close", "connection", "middle"];

        str.slice(1).split("-").map(str => optsList.push(str.match(/[RGF]\d*/g) || []));

        if (direction == "↑") {
          optsList[0].forEach((option, i) => {
            switch (option[0]) {
              case "R":
                if (i == 0) {
                  if (option[1] == 0) {
                    parts.unshift(5);
                  
                  } else {
                    parts.unshift(6);
                    [...Array(option[1] - 1)].map(() => parts.unshift(6, 7));
                    parts.unshift((i < optsList[0].length - 1 ? 3 : 5), 7);
                  }
                
                } else {
                  parts.unshift(4);
                  [...Array(option[1] - 1)].map(() => parts.unshift(6, 7));
                  parts.unshift((i < optsList[0].length - 1 ? 3 : 5), 7);
                }
                break;
              
              case "G":
                if (i == 0) parts.unshift(3);
                [...Array(option[1] - 1)].map(() => parts.unshift(2));
                break;
              
              case "F":
                if (i == 0) parts.unshift(3);
            }
          });
        
          parts.push(0);
        
        } else {
          parts.unshift(3);
          parts.push(1);
        }

        if (optsList[1] == "") parts.push(4);

        optsList[1].forEach((option, i) => {
          if (option[0] == "R") {
            parts.push(i == 0 ? 6 : 3);
            [...Array(option[1] - 1)].map(() => parts.push(7, 6));
            parts.push(7, 4);
          
          } else {
            if (i == 0) parts.push(4);
            [...Array(option.substring(1) - 1)].map(() => parts.push(2));
          }
        });

        var context = canvasWiring.getContext("2d");

        context.clearRect(0, 0, 32, 1000);
        canvasWiring.height = 32 * parts.length;

        parts.forEach((part, i) => {
          var image = new Image();
          image.src = `images/railParts/${partsIndex[`${part}`[0]]}.png`;

          image.onload = () => {
            context.drawImage(image, 0, 32 * i, 32, 32);
          }
        });

        context.imageSmoothingEnabled = false;
      });

      div.appendChild(span);
    });
  });

  if (checkWiringImage.checked) {
    if (divSame.firstChild) {
      divSame.firstChild.click();
    
    } else {
      canvasWiring.getContext("2d").clearRect(0, 0, 32, 1000);
      canvasWiring.height = 320;
    }
  }
}

window.onload = function() {
  for (var i = 0; i < sets.length; i ++) {
    var divSet = document.createElement("div");
    divSet.classList = "divSet";
    divSetsParent.appendChild(divSet);

    var divImgs = document.createElement("div");
    divImgs.classList = "divItems";
    divSet.appendChild(divImgs);
    
    ["a", "b"].forEach(e => {
      var imgSet = document.createElement("img");
      imgSet.classList = "imgSet";
      imgSet.src = `images/sets/set${i}${e}.jpg`;
      divImgs.appendChild(imgSet);
    });

    var divTexts = document.createElement("div");
    divTexts.classList = "divItems";
    divSet.appendChild(divTexts);

    var spanData = document.createElement("span");
    spanData.textContent = `コスト: ${sets[i].cost}, 複合: ${sets[i].combine ? "○" : "×"}`;
    spanData.classList = "spanData";
    divTexts.appendChild(spanData);

    var spanNote = document.createElement("span");
    spanNote.textContent = sets[i].note;
    divTexts.appendChild(spanNote);

    for (var skin = 0; skin < 4; skin ++) {
      var divSkin = document.createElement("div");
      divSkin.id = `divSkin${skin}`;
      divSkin.classList = "divSkin";
      divTexts.appendChild(divSkin);

      var enmList = {sm1: [], sm3: [], smW: [], smU: []};

      var imgSkin = document.createElement("img");
      imgSkin.classList = "imgSkin";
      imgSkin.src = `images/skins/${skins[skin]}.jpg`;
      divSkin.appendChild(imgSkin);

      sets[i][skins[skin]].forEach(numEnm => {
        var imgEnm = document.createElement("img");
        imgEnm.classList = "imgEnm";

        var enmType = "";
        if (skin == 1 && numEnm == 2) enmType = "t";
        if (skin == 3 && numEnm == 2) enmType = "u";
        if (skin == 2 && numEnm == 10) enmType = "w";
        if ([2, 3].includes(skin) && numEnm == 8) enmType = "w";

        imgEnm.src = `images/enms/enm${numEnm}${enmType}.jpg`;
        imgEnm.title = skinsEnms[skin][numEnm];
        divSkin.appendChild(imgEnm);

        enmList[skins[skin]].push(skinsEnms[skin][numEnm]);
      });

      imgSkin.title = enmList[skins[skin]];
    }
  }
}

function funContraptions() {
  divSetsParent.style.display = divSetsParent.style.display == "none" ? "block" : "none";
}

var accelerations = [11, 8, 5, 3, 2, 1, 1];

var startingList = [
  {delay: 0, disp: "↓-", down: 0, up: 0},
  {delay: 14, disp: "↓-R1", down: 2, up: 0},
  {delay: 27, disp: "↓-R2", down: 4, up: 0},
  {delay: 40, disp: "↓-R3", down: 6, up: 0},
  {delay: 54, disp: "↓-R4", down: 8, up: 0},
  {delay: 67, disp: "↓-R5", down: 10, up: 0},
  {delay: 80, disp: "↓-R6", down: 12, up: 0},

  {delay: 21, disp: "↑R0-", down: 0, up: 0.1},
  {delay: 34, disp: "↑R0-R1", down: 2, up: 0.1},
  {delay: 48, disp: "↑R0-R2", down: 4, up: 0.1},
  {delay: 61, disp: "↑R0-R3", down: 6, up: 0.1},
  {delay: 74, disp: "↑R0-R4", down: 8, up: 0.1},
  {delay: 88, disp: "↑R0-R5", down: 10, up: 0.1},
  {delay: 101, disp: "↑R0-R6", down: 12, up: 0.1},

  {delay: 64, disp: "↑R1-", down: 0, up: 2},
  {delay: 78, disp: "↑R1-R1", down: 2, up: 2},
  {delay: 91, disp: "↑R1-R2", down: 4, up: 2},
  {delay: 104, disp: "↑R1-R3", down: 6, up: 2},
  {delay: 118, disp: "↑R1-R4", down: 8, up: 2},
  {delay: 131, disp: "↑R1-R5", down: 10, up: 2},
  {delay: 144, disp: "↑R1-R6", down: 12, up: 2},

  {delay: 82, disp: "↑G1R1-", down: 0, up: 3},
  {delay: 95, disp: "↑G1R1-R1", down: 2, up: 3},
  {delay: 108, disp: "↑G1R1-R2", down: 4, up: 3},
  {delay: 122, disp: "↑G1R1-R3", down: 6, up: 3},
  {delay: 135, disp: "↑G1R1-R4", down: 8, up: 3},
  {delay: 148, disp: "↑G1R1-R5", down: 10, up: 3},
  {delay: 162, disp: "↑G1R1-R6", down: 12, up: 3},

  {delay: 98, disp: "↑G2R1-", down: 0, up: 4},
  {delay: 112, disp: "↑G2R1-R1", down: 2, up: 4},
  {delay: 125, disp: "↑G2R1-R2", down: 4, up: 4},
  {delay: 138, disp: "↑G2R1-R3", down: 6, up: 4},
  {delay: 152, disp: "↑G2R1-R4", down: 8, up: 4},
  {delay: 165, disp: "↑G2R1-R5", down: 10, up: 4},
  {delay: 178, disp: "↑G2R1-R6", down: 12, up: 4},

  {delay: 107, disp: "↑R2-", down: 0, up: 4},
  {delay: 120, disp: "↑R2-R1", down: 2, up: 4},
  {delay: 133, disp: "↑R2-R2", down: 4, up: 4},
  {delay: 147, disp: "↑R2-R3", down: 6, up: 4},
  {delay: 160, disp: "↑R2-R4", down: 8, up: 4},
  {delay: 173, disp: "↑R2-R5", down: 10, up: 4},
  {delay: 187, disp: "↑R2-R6", down: 12, up: 4},

  {delay: 111, disp: "↑F-", down: 0, up: 0.2},
  {delay: 124, disp: "↑F-R1", down: 2, up: 0.2},
  {delay: 137, disp: "↑F-R2", down: 4, up: 0.2},
  {delay: 151, disp: "↑F-R3", down: 6, up: 0.2},
  {delay: 164, disp: "↑F-R4", down: 8, up: 0.2},
  {delay: 177, disp: "↑F-R5", down: 10, up: 0.2},
  {delay: 191, disp: "↑F-R6", down: 12, up: 0.2},

  {delay: 120, disp: "↑G3R1-", down: 0, up: 5},
  {delay: 133, disp: "↑G3R1-R1", down: 2, up: 5},
  {delay: 146, disp: "↑G3R1-R2", down: 4, up: 5},
  {delay: 160, disp: "↑G3R1-R3", down: 6, up: 5},
  {delay: 173, disp: "↑G3R1-R4", down: 8, up: 5},
  {delay: 186, disp: "↑G3R1-R5", down: 10, up: 5},
  {delay: 200, disp: "↑G3R1-R6", down: 12, up: 5},

  {delay: 124, disp: "↑G1R2-", down: 0, up: 5},
  {delay: 137, disp: "↑G1R2-R1", down: 2, up: 5},
  {delay: 150, disp: "↑G1R2-R2", down: 4, up: 5},
  {delay: 164, disp: "↑G1R2-R3", down: 6, up: 5},
  {delay: 177, disp: "↑G1R2-R4", down: 8, up: 5},
  {delay: 190, disp: "↑G1R2-R5", down: 10, up: 5},
  {delay: 204, disp: "↑G1R2-R6", down: 12, up: 5},

  {delay: 125, disp: "↑R1G1R1-", down: 0, up: 5},
  {delay: 138, disp: "↑R1G1R1-R1", down: 2, up: 5},
  {delay: 152, disp: "↑R1G1R1-R2", down: 4, up: 5},
  {delay: 165, disp: "↑R1G1R1-R3", down: 6, up: 5},
  {delay: 178, disp: "↑R1G1R1-R4", down: 8, up: 5},
  {delay: 192, disp: "↑R1G1R1-R5", down: 10, up: 5},
  {delay: 205, disp: "↑R1G1R1-R6", down: 12, up: 5},

  {delay: 140, disp: "↑G2R2-", down: 0, up: 6},
  {delay: 154, disp: "↑G2R2-R1", down: 2, up: 6},
  {delay: 167, disp: "↑G2R2-R2", down: 4, up: 6},
  {delay: 180, disp: "↑G2R2-R3", down: 6, up: 6},
  {delay: 194, disp: "↑G2R2-R4", down: 8, up: 6},
  {delay: 207, disp: "↑G2R2-R5", down: 10, up: 6},
  {delay: 220, disp: "↑G2R2-R6", down: 12, up: 6},

  {delay: 149, disp: "↑R3-", down: 0, up: 6},
  {delay: 162, disp: "↑R3-R1", down: 2, up: 6},
  {delay: 176, disp: "↑R3-R2", down: 4, up: 6},
  {delay: 189, disp: "↑R3-R3", down: 6, up: 6},
  {delay: 202, disp: "↑R3-R4", down: 8, up: 6},
  {delay: 216, disp: "↑R3-R5", down: 10, up: 6},
  {delay: 229, disp: "↑R3-R6", down: 12, up: 6},

  {delay: 159, disp: "↑G1R1G2R1-", down: 0, up: 7},
  {delay: 172, disp: "↑G1R1G2R1-R1", down: 2, up: 7},
  {delay: 185, disp: "↑G1R1G2R1-R2", down: 4, up: 7},
  {delay: 199, disp: "↑G1R1G2R1-R3", down: 6, up: 7},
  {delay: 212, disp: "↑G1R1G2R1-R4", down: 8, up: 7},
  {delay: 225, disp: "↑G1R1G2R1-R5", down: 10, up: 7},
  {delay: 239, disp: "↑G1R1G2R1-R6", down: 12, up: 7},

  {delay: 159, disp: "↑G2R1G1R1-", down: 0, up: 7},
  {delay: 173, disp: "↑G2R1G1R1-R1", down: 2, up: 7},
  {delay: 185, disp: "↑G2R1G1R1-R2", down: 4, up: 7},
  {delay: 199, disp: "↑G2R1G1R1-R3", down: 6, up: 7},
  {delay: 213, disp: "↑G2R1G1R1-R4", down: 8, up: 7},
  {delay: 226, disp: "↑G2R1G1R1-R5", down: 10, up: 7},
  {delay: 239, disp: "↑G2R1G1R1-R6", down: 12, up: 7},

  {delay: 162, disp: "↑G3R2-", down: 0, up: 7},
  {delay: 175, disp: "↑G3R2-R1", down: 2, up: 7},
  {delay: 188, disp: "↑G3R2-R2", down: 4, up: 7},
  {delay: 202, disp: "↑G3R2-R3", down: 6, up: 7},
  {delay: 215, disp: "↑G3R2-R4", down: 8, up: 7},
  {delay: 228, disp: "↑G3R2-R5", down: 10, up: 7},
  {delay: 243, disp: "↑G3R2-R6", down: 12, up: 7},

  {delay: 163, disp: "↑R1G3R1-", down: 0, up: 7},
  {delay: 176, disp: "↑R1G3R1-R1", down: 2, up: 7},
  {delay: 190, disp: "↑R1G3R1-R2", down: 4, up: 7},
  {delay: 203, disp: "↑R1G3R1-R3", down: 6, up: 7},
  {delay: 216, disp: "↑R1G3R1-R4", down: 8, up: 7},
  {delay: 230, disp: "↑R1G3R1-R5", down: 10, up: 7},
  {delay: 244, disp: "↑R1G3R1-R6", down: 12, up: 7},

  {delay: 154, disp: "↑R1F-", down: 0, up: 2},
  {delay: 167, disp: "↑R1F-R1", down: 2, up: 2},
  {delay: 181, disp: "↑R1F-R2", down: 4, up: 2},
  {delay: 194, disp: "↑R1F-R3", down: 6, up: 2},
  {delay: 207, disp: "↑R1F-R4", down: 8, up: 2},
  {delay: 221, disp: "↑R1F-R5", down: 10, up: 2},
  {delay: 234, disp: "↑R1F-R6", down: 12, up: 2},

  {delay: 142, disp: "↑R1G2R1-", down: 0, up: 6},
  {delay: 155, disp: "↑R1G2R1-R1", down: 2, up: 6},
  {delay: 168, disp: "↑R1G2R1-R2", down: 4, up: 6},
  {delay: 182, disp: "↑R1G2R1-R3", down: 6, up: 6},
  {delay: 195, disp: "↑R1G2R1-R4", down: 8, up: 6},
  {delay: 208, disp: "↑R1G2R1-R5", down: 10, up: 6},
  {delay: 222, disp: "↑R1G2R1-R6", down: 12, up: 6},

  {delay: 167, disp: "↑G1R3-", down: 0, up: 7},
  {delay: 180, disp: "↑G1R3-R1", down: 2, up: 7},
  {delay: 193, disp: "↑G1R3-R2", down: 4, up: 7},
  {delay: 207, disp: "↑G1R3-R3", down: 6, up: 7},
  {delay: 220, disp: "↑G1R3-R4", down: 8, up: 7},
  {delay: 233, disp: "↑G1R3-R5", down: 10, up: 7},
  {delay: 247, disp: "↑G1R3-R6", down: 12, up: 7},

  {delay: 175, disp: "↑G2R1G2R1-", down: 0, up: 8},
  {delay: 189, disp: "↑G2R1G2R1-R1", down: 2, up: 8},
  {delay: 202, disp: "↑G2R1G2R1-R2", down: 4, up: 8},
  {delay: 215, disp: "↑G2R1G2R1-R3", down: 6, up: 8},
  {delay: 229, disp: "↑G2R1G2R1-R4", down: 8, up: 8},
  {delay: 242, disp: "↑G2R1G2R1-R5", down: 10, up: 8},
  {delay: 255, disp: "↑G2R1G2R1-R6", down: 12, up: 8},

  {delay: 167, disp: "↑R1G1R2-", down: 0, up: 5},
  {delay: 180, disp: "↑R1G1R2-R1", down: 2, up: 5},
  {delay: 194, disp: "↑R1G1R2-R2", down: 4, up: 5},
  {delay: 207, disp: "↑R1G1R2-R3", down: 6, up: 5},
  {delay: 220, disp: "↑R1G1R2-R4", down: 8, up: 5},
  {delay: 234, disp: "↑R1G1R2-R5", down: 10, up: 5},
  {delay: 247, disp: "↑R1G1R2-R6", down: 12, up: 5},

  {delay: 167, disp: "↑R2G1R1-", down: 0, up: 5},
  {delay: 181, disp: "↑R2G1R1-R1", down: 2, up: 5},
  {delay: 194, disp: "↑R2G1R1-R2", down: 4, up: 5},
  {delay: 207, disp: "↑R2G1R1-R3", down: 6, up: 5},
  {delay: 221, disp: "↑R2G1R1-R4", down: 8, up: 5},
  {delay: 234, disp: "↑R2G1R1-R5", down: 10, up: 5},
  {delay: 247, disp: "↑R2G1R1-R6", down: 12, up: 5},

  {delay: 172, disp: "↑G1R1F-", down: 0, up: 3},
  {delay: 185, disp: "↑G1R1F-R1", down: 2, up: 3},
  {delay: 198, disp: "↑G1R1F-R2", down: 4, up: 3},
  {delay: 212, disp: "↑G1R1F-R3", down: 6, up: 3},
  {delay: 225, disp: "↑G1R1F-R4", down: 8, up: 3},
  {delay: 238, disp: "↑G1R1F-R5", down: 10, up: 3},
  {delay: 252, disp: "↑G1R1F-R6", down: 12, up: 3},

  {delay: 184, disp: "↑G2R3-", down: 0, up: 8},
  {delay: 198, disp: "↑G2R3-R1", down: 2, up: 8},
  {delay: 211, disp: "↑G2R3-R2", down: 4, up: 8},
  {delay: 224, disp: "↑G2R3-R3", down: 6, up: 8},
  {delay: 238, disp: "↑G2R3-R4", down: 8, up: 8},
  {delay: 251, disp: "↑G2R3-R5", down: 10, up: 8},
  {delay: 264, disp: "↑G2R3-R6", down: 12, up: 8},

  {delay: 184, disp: "↑R1G2R2-", down: 0, up: 8},
  {delay: 197, disp: "↑R1G2R2-R1", down: 2, up: 8},
  {delay: 210, disp: "↑R1G2R2-R2", down: 4, up: 8},
  {delay: 224, disp: "↑R1G2R2-R3", down: 6, up: 8},
  {delay: 237, disp: "↑R1G2R2-R4", down: 8, up: 8},
  {delay: 250, disp: "↑R1G2R2-R5", down: 10, up: 8},
  {delay: 264, disp: "↑R1G2R2-R6", down: 12, up: 8},

  {delay: 184, disp: "↑R2G2R1-", down: 0, up: 8},
  {delay: 197, disp: "↑R2G2R1-R1", down: 2, up: 8},
  {delay: 211, disp: "↑R2G2R1-R2", down: 4, up: 8},
  {delay: 224, disp: "↑R2G2R1-R3", down: 6, up: 8},
  {delay: 237, disp: "↑R2G2R1-R4", down: 8, up: 8},
  {delay: 251, disp: "↑R2G2R1-R5", down: 10, up: 8},
  {delay: 264, disp: "↑R2G2R1-R6", down: 12, up: 8},

  {delay: 196, disp: "↑R2F-", down: 0, up: 4},
  {delay: 210, disp: "↑R2F-R1", down: 2, up: 4},
  {delay: 223, disp: "↑R2F-R2", down: 4, up: 4},
  {delay: 236, disp: "↑R2F-R3", down: 6, up: 4},
  {delay: 250, disp: "↑R2F-R4", down: 8, up: 4},
  {delay: 263, disp: "↑R2F-R5", down: 10, up: 4},
  {delay: 276, disp: "↑R2F-R6", down: 12, up: 4},

  {delay: 192, disp: "↑R4-", down: 0, up: 8},
  {delay: 206, disp: "↑R4-R1", down: 2, up: 8},
  {delay: 219, disp: "↑R4-R2", down: 4, up: 8},
  {delay: 232, disp: "↑R4-R3", down: 6, up: 8},
  {delay: 246, disp: "↑R4-R4", down: 8, up: 8},
  {delay: 259, disp: "↑R4-R5", down: 10, up: 8},
  {delay: 272, disp: "↑R4-R6", down: 12, up: 8},

  {delay: 235, disp: "↑R5-", down: 0, up: 10},
  {delay: 248, disp: "↑R5-R1", down: 2, up: 10},
  {delay: 261, disp: "↑R5-R2", down: 4, up: 10},
  {delay: 275, disp: "↑R5-R3", down: 6, up: 10},
  {delay: 288, disp: "↑R5-R4", down: 8, up: 10},
  {delay: 301, disp: "↑R5-R5", down: 10, up: 10},
  {delay: 315, disp: "↑R5-R6", down: 12, up: 10},

  {delay: 197, disp: "↑G2R1G3R1-", down: 0, up: 9},
  {delay: 211, disp: "↑G2R1G3R1-R1", down: 2, up: 9},
  {delay: 224, disp: "↑G2R1G3R1-R2", down: 4, up: 9},
  {delay: 237, disp: "↑G2R1G3R1-R3", down: 6, up: 9},
  {delay: 251, disp: "↑G2R1G3R1-R4", down: 8, up: 9},
  {delay: 264, disp: "↑G2R1G3R1-R5", down: 10, up: 9},
  {delay: 277, disp: "↑G2R1G3R1-R6", down: 12, up: 9},

  {delay: 197, disp: "↑G3R1G2R1-", down: 0, up: 9},
  {delay: 210, disp: "↑G3R1G2R1-R1", down: 2, up: 9},
  {delay: 223, disp: "↑G3R1G2R1-R2", down: 4, up: 9},
  {delay: 237, disp: "↑G3R1G2R1-R3", down: 6, up: 9},
  {delay: 250, disp: "↑G3R1G2R1-R4", down: 8, up: 9},
  {delay: 263, disp: "↑G3R1G2R1-R5", down: 10, up: 9},
  {delay: 277, disp: "↑G3R1G2R1-R6", down: 12, up: 9},

  {delay: 239, disp: "↑R3F-", down: 0, up: 6},
  {delay: 252, disp: "↑R3F-R1", down: 2, up: 6},
  {delay: 265, disp: "↑R3F-R2", down: 4, up: 6},
  {delay: 279, disp: "↑R3F-R3", down: 6, up: 6},
  {delay: 292, disp: "↑R3F-R4", down: 8, up: 6},
  {delay: 305, disp: "↑R3F-R5", down: 10, up: 6},
  {delay: 319, disp: "↑R3F-R6", down: 12, up: 6},

  {delay: 188, disp: "↑G2R1F-", down: 0, up: 4},
  {delay: 202, disp: "↑G2R1F-R1", down: 2, up: 4},
  {delay: 215, disp: "↑G2R1F-R2", down: 4, up: 4},
  {delay: 228, disp: "↑G2R1F-R3", down: 6, up: 4},
  {delay: 242, disp: "↑G2R1F-R4", down: 8, up: 4},
  {delay: 255, disp: "↑G2R1F-R5", down: 10, up: 4},
  {delay: 268, disp: "↑G2R1F-R6", down: 12, up: 4},

  {delay: 210, disp: "↑G3R1F-", down: 0, up: 5},
  {delay: 223, disp: "↑G3R1F-R1", down: 2, up: 5},
  {delay: 236, disp: "↑G3R1F-R2", down: 4, up: 5},
  {delay: 250, disp: "↑G3R1F-R3", down: 6, up: 5},
  {delay: 263, disp: "↑G3R1F-R4", down: 8, up: 5},
  {delay: 276, disp: "↑G3R1F-R5", down: 10, up: 5},
  {delay: 290, disp: "↑G3R1F-R6", down: 12, up: 5},

  {delay: 202, disp: "↑G1R2G2R1-", down: 0, up: 9},
  {delay: 215, disp: "↑G1R2G2R1-R1", down: 2, up: 9},
  {delay: 228, disp: "↑G1R2G2R1-R2", down: 4, up: 9},
  {delay: 242, disp: "↑G1R2G2R1-R3", down: 6, up: 9},
  {delay: 255, disp: "↑G1R2G2R1-R4", down: 8, up: 9},
  {delay: 268, disp: "↑G1R2G2R1-R5", down: 10, up: 9},
  {delay: 282, disp: "↑G1R2G2R1-R6", down: 12, up: 9},

  {delay: 202, disp: "↑G2R1G1R2-", down: 0, up: 9},
  {delay: 216, disp: "↑G2R1G1R2-R1", down: 2, up: 9},
  {delay: 229, disp: "↑G2R1G1R2-R2", down: 4, up: 9},
  {delay: 242, disp: "↑G2R1G1R2-R3", down: 6, up: 9},
  {delay: 256, disp: "↑G2R1G1R2-R4", down: 8, up: 9},
  {delay: 269, disp: "↑G2R1G1R2-R5", down: 10, up: 9},
  {delay: 282, disp: "↑G2R1G1R2-R6", down: 12, up: 9},

  {delay: 205, disp: "↑G3R3-", down: 0, up: 9},
  {delay: 218, disp: "↑G3R3-R1", down: 2, up: 9},
  {delay: 231, disp: "↑G3R3-R2", down: 4, up: 9},
  {delay: 245, disp: "↑G3R3-R3", down: 6, up: 9},
  {delay: 258, disp: "↑G3R3-R4", down: 8, up: 9},
  {delay: 271, disp: "↑G3R3-R5", down: 10, up: 9},
  {delay: 285, disp: "↑G3R3-R6", down: 12, up: 9},

  {delay: 205, disp: "↑R1G3R2-", down: 0, up: 9},
  {delay: 218, disp: "↑R1G3R2-R1", down: 2, up: 9},
  {delay: 232, disp: "↑R1G3R2-R2", down: 4, up: 9},
  {delay: 245, disp: "↑R1G3R2-R3", down: 6, up: 9},
  {delay: 258, disp: "↑R1G3R2-R4", down: 8, up: 9},
  {delay: 272, disp: "↑R1G3R2-R5", down: 10, up: 9},
  {delay: 285, disp: "↑R1G3R2-R6", down: 12, up: 9},

  {delay: 205, disp: "↑R2G3R1-", down: 0, up: 9},
  {delay: 219, disp: "↑R2G3R1-R1", down: 2, up: 9},
  {delay: 232, disp: "↑R2G3R1-R2", down: 4, up: 9},
  {delay: 245, disp: "↑R2G3R1-R3", down: 6, up: 9},
  {delay: 259, disp: "↑R2G3R1-R4", down: 8, up: 9},
  {delay: 272, disp: "↑R2G3R1-R5", down: 10, up: 9},
  {delay: 285, disp: "↑R2G3R1-R6", down: 12, up: 9},

  {delay: 210, disp: "↑R1G1R3-", down: 0, up: 9},
  {delay: 223, disp: "↑R1G1R3-R1", down: 2, up: 9},
  {delay: 237, disp: "↑R1G1R3-R2", down: 4, up: 9},
  {delay: 250, disp: "↑R1G1R3-R3", down: 6, up: 9},
  {delay: 263, disp: "↑R1G1R3-R4", down: 8, up: 9},
  {delay: 277, disp: "↑R1G1R3-R5", down: 10, up: 9},
  {delay: 290, disp: "↑R1G1R3-R6", down: 12, up: 9},

  {delay: 209, disp: "↑R2G1R2-", down: 0, up: 9},
  {delay: 223, disp: "↑R2G1R2-R1", down: 2, up: 9},
  {delay: 236, disp: "↑R2G1R2-R2", down: 4, up: 9},
  {delay: 249, disp: "↑R2G1R2-R3", down: 6, up: 9},
  {delay: 263, disp: "↑R2G1R2-R4", down: 8, up: 9},
  {delay: 276, disp: "↑R2G1R2-R5", down: 10, up: 9},
  {delay: 289, disp: "↑R2G1R2-R6", down: 12, up: 9},

  {delay: 214, disp: "↑G1R2F-", down: 0, up: 5},
  {delay: 227, disp: "↑G1R2F-R1", down: 2, up: 5},
  {delay: 240, disp: "↑G1R2F-R2", down: 4, up: 5},
  {delay: 254, disp: "↑G1R2F-R3", down: 6, up: 5},
  {delay: 267, disp: "↑G1R2F-R4", down: 8, up: 5},
  {delay: 280, disp: "↑G1R2F-R5", down: 10, up: 5},
  {delay: 294, disp: "↑G1R2F-R6", down: 12, up: 5},

  {delay: 230, disp: "↑G2R2F-", down: 0, up: 6},
  {delay: 244, disp: "↑G2R2F-R1", down: 2, up: 6},
  {delay: 257, disp: "↑G2R2F-R2", down: 4, up: 6},
  {delay: 270, disp: "↑G2R2F-R3", down: 6, up: 6},
  {delay: 284, disp: "↑G2R2F-R4", down: 8, up: 6},
  {delay: 297, disp: "↑G2R2F-R5", down: 10, up: 6},
  {delay: 310, disp: "↑G2R2F-R6", down: 12, up: 6},

  {delay: 232, disp: "↑R1G2R1F-", down: 0, up: 6},
  {delay: 245, disp: "↑R1G2R1F-R1", down: 2, up: 6},
  {delay: 258, disp: "↑R1G2R1F-R2", down: 4, up: 6},
  {delay: 272, disp: "↑R1G2R1F-R3", down: 6, up: 6},
  {delay: 285, disp: "↑R1G2R1F-R4", down: 8, up: 6},
  {delay: 298, disp: "↑R1G2R1F-R5", down: 10, up: 6},
  {delay: 312, disp: "↑R1G2R1F-R6", down: 12, up: 6}
];

var gapList = [
  {delay: 0, disp: "", down: 0},

  {delay: 19, disp: "G1R1", down: 3},
  {delay: 32, disp: "G1R2", down: 5},
  {delay: 45, disp: "G1R3", down: 7},
  {delay: 59, disp: "G1R4", down: 9},
  {delay: 72, disp: "G1R5", down: 11},

  {delay: 22, disp: "G2R1", down: 4},
  {delay: 36, disp: "G2R2", down: 6},
  {delay: 49, disp: "G2R3", down: 8},
  {delay: 62, disp: "G2R4", down: 10},
  {delay: 76, disp: "G2R5", down: 12},

  {delay: 25, disp: "G3R1", down: 5},
  {delay: 38, disp: "G3R2", down: 7},
  {delay: 51, disp: "G3R3", down: 9},
  {delay: 65, disp: "G3R4", down: 11},

  {delay: 26, disp: "G4R1", down: 6},
  {delay: 40, disp: "G4R2", down: 8},
  {delay: 53, disp: "G4R3", down: 10},
  {delay: 66, disp: "G4R4", down: 12},

  {delay: 28, disp: "G5R1", down: 7},
  {delay: 41, disp: "G5R2", down: 9},
  {delay: 54, disp: "G5R3", down: 11},

  {delay: 28, disp: "G6R1", down: 8},
  {delay: 42, disp: "G6R2", down: 10},
  {delay: 55, disp: "G6R3", down: 12},

  {delay: 30, disp: "G7R1", down: 9},
  {delay: 43, disp: "G7R2", down: 11},
  {delay: 56, disp: "G7R3", down: 13},

  {delay: 29, disp: "G8R1", down: 10},
  {delay: 42, disp: "G8R2", down: 12},
  {delay: 56, disp: "G8R3", down: 14},

  {delay: 29, disp: "G9R1", down: 11},
  {delay: 42, disp: "G9R2", down: 13},
  {delay: 56, disp: "G9R3", down: 15},

  {delay: 29, disp: "G10R1", down: 12}
];

var commonEnms = ["チョロプー", "ガボン", "ボムへい", "メカクッパ", "ミサイルメカクッパ(赤メカクッパ)", "ビームメカクッパ(青メカクッパ)", "クッパJr.", "ハナチャン", "ハンマーブロス", "メガブロス", "サンボ", "カメック", "プー", "トゲメット", "緑ノコノコ", "赤ノコノコ", "カロン", "メット", "トゲメット", "カロンこうら", "メットこうら", "トゲメットこうら", "杭なしワンワン", "ブラックパックン", "POWブロック", "Pスイッチ", "縦ジャンプ台(縦バネ)", "横ジャンプ台(横バネ)", "砲台", "キラー砲台", "ドッスン", "クッパ", "ブンブン", "ラリー", "イギー", "ウェンディ", "レミー", "ロイ", "モートン", "ルドウィッグ", "ワンワンの杭"];
    
var sm1Enms = ["スーパーキノコ", "1UPキノコ", "マリオUSAのキノコ(USAキノコ)", "スーパースター", "ファイアフラワー", "スーパーボールフラワー", "マスターソード", "でかキノコ", "くつクリボー", "クイーンくつクリボー", "パックンフラワー", "ファイアパックン", "クッパクラウン", "クリボー", "カキボー"].concat(commonEnms);
var sm3Enms = ["スーパーキノコ", "1UPキノコ", "カエルスーツ", "スーパースター", "ファイアフラワー", "-", "-", "-", "くつクリボー", "クイーンくつクリボー", "パックンフラワー", "ファイアパックン", "クッパクラウン", "クリボー", "カキボー"].concat(commonEnms);
var smWEnms = ["スーパーキノコ", "1UPキノコ", "-", "スーパースター", "ファイアフラワー", "-", "-", "-", "ヨッシー", "-", "ピーパックン", "ファイアパックン", "クッパクラウン", "クリボン", "カキボン"].concat(commonEnms);
var smUEnms = ["スーパーキノコ", "1UPキノコ", "スーパードングリ", "スーパースター", "ファイアフラワー", "-", "-", "-", "ヨッシー", "-", "パックンフラワー", "ファイアパックン", "クッパクラウン", "クリボー", "カキボー"].concat(commonEnms);

var skins = ["sm1", "sm3", "smW", "smU"];
var skinsEnms = [sm1Enms, sm3Enms, smWEnms, smUEnms];

var sets = [
  {
    cost: 0,
    combine: false,
    sm1: [8, 9, 29, 30, 31, 33, 37],
    sm3: [8, 9, 29, 30, 31, 33, 37],
    smW: [29, 30, 31, 33, 37],
    smU: [33, 37],
    note: "これらの音源を単体で使いたいならこれが一番。"
  },
  {
    cost: 0,
    combine: false,
    sm1: [29, 30, 31],
    sm3: [29, 30, 31],
    smW: [29, 30, 31],
    smU: [],
    note: "ノコノコ系のみ。smUで使えないのはたぶん背が高いせいの可能性が高い。"
  },
  {
    cost: 0,
    combine: false,
    sm1: [10, 11],
    sm3: [10, 11],
    smW: [11],
    smU: [10, 11],
    note: "オーソドックスなパックン音源。"
  },
  {
    cost: 0,
    combine: false,
    sm1: [41],
    sm3: [41],
    smW: [41],
    smU: [41],
    note: "ドラム系で唯一音符ブロックに埋め込んでグローバルになる。近くだとうるさい。"
  },
  {
    cost: 0,
    combine: false,
    sm1: [38],
    sm3: [38],
    smW: [38],
    smU: [38],
    note: "ブラパ単体のグローバル化だとコンベアと坂を用いた手法が主流だけどこれの方がコンパクト。"
  },
  {
    cost: 0,
    combine: false,
    sm1: [25],
    sm3: [25],
    smW: [25],
    smU: [25],
    note: "白音符ブロックを使用するため近くだと雑音あり。音の間隔が短いと鳴らなかったり壊れたり。"
  },
  {
    cost: 1,
    combine: false,
    sm1: [24],
    sm3: [24],
    smW: [24],
    smU: [],
    note: "たつまきを使用してメガブロスにジャンプさせない。smUは少し違う配置。"
  },
  {
    cost: 1,
    combine: false,
    sm1: [],
    sm3: [],
    smW: [],
    smU: [24],
    note: "これはその他のスキンよりもコンパクトにできる。"
  },
  {
    cost: 0,
    combine: false,
    sm1: [23],
    sm3: [23],
    smW: [23],
    smU: [23],
    note: "空中飛ばしを活用してソフトタッチ(?)。スペースはとるけどスネークブロック不使用で環境と財布にやさしい。"
  },
  {
    cost: 0,
    combine: false,
    sm1: [0, 1, 2, 3, 4, 5, 6, 7],
    sm3: [0, 1, 2, 3, 4],
    smW: [0, 1, 3, 4],
    smU: [0, 1, 2, 3, 4],
    note: "古典的な坂を使った押さえつけ。下からは無理でも横からなら。"
  },
  {
    cost: 2,
    combine: false,
    sm1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 46, 47],
    sm3: [0, 1, 2, 3, 4, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 46, 47],
    smW: [0, 1, 3, 4, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 46, 47],
    smU: [0, 1, 2, 3, 4, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 47],
    note: "だいたいなんでもいける。クレーンを動かすことで複合できる。プレイヤーが近づくとPOWを放してしまうので注意。"
  },
  {
    cost: 2,
    combine: true,
    sm1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 46, 47],
    sm3: [0, 1, 2, 3, 4, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 46, 47],
    smW: [0, 1, 3, 4, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 46, 47],
    smU: [0, 1, 2, 3, 4, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37, 47],
    note: "複合可能なものとしては最も広く使われているであろう配置。高コストに目を瞑れば便利。プレイヤーが近づくとPOWを放してしまうので注意。"
  },
  {
    cost: 0,
    combine: true,
    sm1: [7, 13, 15, 16, 17, 18, 21, 22],
    sm3: [13, 15, 16, 17, 18, 21, 22],
    smW: [13, 15, 16, 17, 18, 21, 22],
    smU: [7, 13, 15, 16, 17, 18, 21, 22, 29],
    note: "ほぼ同じ性質を持っているはずのカキボーや異色メカクッパ, 異色ノコノコは使えたり使えなかったり。音の間隔が短いと鳴らなかったり壊れたり。"
  },
  {
    cost: 0,
    combine: true,
    sm1: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 23, 34, 36],
    sm3: [0, 1, 2, 3, 4, 8, 9, 10, 11, 23, 34, 36],
    smW: [0, 1, 3, 4, 8, 10, 11, 23, 34, 36],
    smU: [0, 1, 2, 3, 4, 8, 10, 11, 23, 34, 36],
    note: "大ブラパに埋め込み。いろんな音符の当て方ができる。クリボーやメカクッパ, ノコノコなどもできるのだが埋め込みが安定しないため除外してある。"
  },
  {
    cost: 0,
    combine: true,
    sm1: [0, 1, 2, 3, 4, 5, 6, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    sm3: [0, 1, 2, 3, 4, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    smW: [0, 1, 3, 4, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    smU: [0, 1, 2, 3, 4, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    note: "これも埋め込みであるため下から以外なら少々乱暴に扱ってもOK。とても汎用性が高く便利。"
  },
  {
    cost: 1,
    combine: true,
    sm1: [0, 1, 2, 3, 4, 5, 6, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    sm3: [0, 1, 2, 3, 4, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    smW: [0, 1, 3, 4, 8, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    smU: [0, 1, 2, 3, 4, 8, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31],
    note: "たつまき不使用verに比べてコストが上がっているが, ハンマーブロス(かクッパJr.)を使う場合はスタックしなくていいので全体的にコストが下がる。注意として, アイテムやヨッシーのみでは使えず他の敵エネミーと一緒に使う必要がある(アイテムのみなら別の方法の方がいいけど)。"
  },
  {
    cost: 2,
    combine: false,
    sm1: [38, 39, 40, 41, 42, 43, 44, 55],
    sm3: [38, 39, 40, 41, 42, 43, 44, 55],
    smW: [38, 39, 40, 41, 42, 43, 44, 55],
    smU: [38, 39, 40, 41, 42, 43, 44, 55],
    note: "スイッチで切り替えられるドラム。POW, 縦バネ, ブラパでうまくいかない時は一番下の砲台を大ブラパに変えるとよい。"
  },
  {
    cost: 1,
    combine: false,
    sm1: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    sm3: [0, 1, 2, 3, 4, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    smW: [0, 1, 3, 4, 8, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    smU: [0, 1, 2, 3, 4, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    note: "だいたいなんでもいける。音源ELAの節約と複合ができないのが玉に瑕。"
  }
];
