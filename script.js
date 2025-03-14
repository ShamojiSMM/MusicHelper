"use strict";

function isNum(...values) {
  if (!values.length) return false;
  for (const value of values) {
    if (value === 0) return true;
    if (["", null, Infinity, true, false].includes(value) || isNaN(value)) return false;
  }

  return true;
}

function getElm(selector) {
  return document.querySelector(selector);
}

function getElmAll(selector) {
  return document.querySelectorAll(selector);
}

function addOption(select, text, value) {
  const option = document.createElement("option");
  option.text = text || "";
  if (value != undefined) option.value = value;

  select.append(option);
}

function changeEditable(element, isEditable) {
  const classList = element.parentNode.classList;

  if (isEditable) classList.remove("uneditable");
  else classList.add("uneditable");
}

function changeVisible(element, isVisible, isToParent = true) {
  const classList = (isToParent ? element.parentNode : element).classList;

  if (isVisible) classList.remove("invisible");
  else classList.add("invisible");
}

function clearRow(tableInd, rowInd, startCellInd = 1) {
  const cells = tables[tableInd].rows[rowInd].cells;
  for (let c = startCellInd; c <= tableLength; c ++) cells[c].textContent = "";
}

function clearRows(tableInd, rowInds, startCellInd = 1) {
  rowInds.forEach(r => clearRow(tableInd, r, startCellInd));
}

function clearCell(tableInd, rowInd, cellInd) {
  tables[tableInd].rows[rowInd].cells[cellInd].textContent = "";
}

const tableLength = 150;
const sortableRange = 6;

const selectTrack = getElm("#selectTrack");
for (let i = 1; i <= 16; i ++) addOption(selectTrack, i);
selectTrack.selectedIndex = 2;

const keyNames = ["ド", "ド#", "レ", "レ#", "ミ", "ファ", "ファ#", "ソ", "ソ#", "ラ", "ラ#", "シ"];

const selectBaseKey = getElm("#selectBaseKey");

for (let i = 27; i >= 0; i --) {
  const text = `${Math.floor(i / 12) + 1}-${keyNames[i % 12]}`;
  addOption(selectBaseKey, text);
}

selectBaseKey.selectedIndex = 15;

const inputTickUnit = getElm("#inputTickUnit");
const selectNoteInput = getElm("#selectNoteInput");

let tickUnit = 480;
inputTickUnit.addEventListener("input", () => {
  tickUnit = inputTickUnit.value;

  calcAllNotes();
});

function changeNoteInput(isClearRows = true)  {
  const index = selectNoteInput.selectedIndex;

  changeEditable(inputTickUnit, index == 0);
  if (isClearRows) clearRows(0, [2, 3]);

  selectNoteInput.parentNode.parentNode.title = selectNoteInput.options[index].title;
}

selectNoteInput.addEventListener("change", () => changeNoteInput);
changeNoteInput(false);

const selectLanding = getElm("#selectLanding");

let typeKeys;

function changeType(isClearRow = true) {
  typeKeys = selectType.value.split("-");
  const landings = dataAssets[typeKeys[0]][typeKeys[1]].landings;

  selectLanding.options.length = 1;
  landings.forEach(landing => addOption(selectLanding, landing.name));

  if (isClearRow) clearRow(1, 3, 2);
}

const selectType = getElm("#selectType");
selectType.addEventListener("change", changeType);

changeType(false);

const selectLoading = getElm("#selectLoading");
const selectLoadingInput = getElm("#selectLoadingInput");
const inputScrollSlownessAve = getElm("#inputScrollSlownessAve");
const inputScrollSlownessCycle = getElm("#inputScrollSlownessCycle");

selectLoading.addEventListener("change", () => {
  const index = selectLoading.selectedIndex;
  if (index == 3) {
    changeVisible(selectLoadingInput, true);
    changeLoadingInput();

    changeVisible(tables[1].rows[4], true, false);

  } else {
    changeVisible(selectLoadingInput, false);
    changeVisible(inputScrollSlownessCycle, false);

    changeVisible(inputScrollSlownessAve, index == 2);
    changeVisible(tables[1].rows[4], false, false);
  }
});

function changeLoadingInput() {
  const isVisibles = [
    [false, false], [true, false], [false, true]
  ][selectLoadingInput.selectedIndex];

  changeVisible(inputScrollSlownessAve, isVisibles[0]);
  changeVisible(inputScrollSlownessCycle, isVisibles[1]);

  inputScrollSlownessAve.value = "";
  inputScrollSlownessCycle.value = "";
  clearRow(1, 4, 2);
}

selectLoadingInput.addEventListener("change", changeLoadingInput);

const tables = getElmAll("table");
const spanWiringData = getElm("#spanWiringData");

tables.forEach((table, t) => {
  const rows = Array.from(table.children[0].children);

  rows.forEach((row, r) => {
    let elm = "td";
    let fun = () => {}

    switch (true) {
      case r == 1:
      default:
        fun = cell => {
          cell.contentEditable = true;
          cell.addEventListener("blur", () => cell.scrollLeft = 0);
        }
        break;

      case r == 0:
        elm = "th";
        fun = (cell, c) => { cell.textContent = c }
        break;

      case t == 2:
        if (r == 5) fun = (cell, c) => {
          cell.addEventListener("click", () => {
            const rows = tables[2].rows;
            const [delay, height] = [
              rows[2].cells[c].textContent, rows[3].cells[c].textContent
            ];

            if (!isNum(delay, height)) return;
            getElm(".wiringDisplay")?.classList.remove("wiringDisplay");
            cell.classList.add("wiringDisplay");

            const keyName = selectBaseKey.options[
              selectBaseKey.selectedIndex - height + parseInt(inputBaseHeight.value)
            ].text;

            spanWiringData.textContent = `
              列: ${c},
              音階: ${keyName},
              遅延: ${delay},
              高さ: ${height}
            `;

            const context = canvasOverviewSelect.getContext("2d");
            const canvasHeight = canvasOverview.height;

            context.clearRect(0, 0, canvasOverview.width, canvasHeight);
            context.fillStyle = "#98fb98";
            context.fillRect((c - 1) * 16, 0, 16, canvasHeight);

            [inputWiringDelay.value, inputWiringHeight.value] = [delay, height];
            selectWiringType.selectedIndex = selectType.selectedIndex;
            changeWiringType();

            let accelerationType = "general";

            const landingType = selectLanding.value;
            if (c == 1) {
              accelerationType = {
                "1v": "vertical",
                "1d": "diagonal",
                "2a": "second"
              }[landingType] || accelerationType;

            } else if (
              typeKeys[0] == "wing" && typeKeys[1] == "ground"
              && (c == 2 && ["1v", "1d", "4a"].includes(landingType))
            ) accelerationType = "second";

            selectWiringLanding.value = accelerationType;
            findWiring();
          });
        }
        break;

      case t == 0 && r == 2:
        fun = (cell, c) => {
          cell.contentEditable = true;
          cell.addEventListener("blur", () => cell.scrollLeft = 0);
          cell.addEventListener("input", () => calcNote(c));
        }
    }

    for (let c = 1; c <= tableLength; c ++) {
      const cell = document.createElement(elm);
      fun(cell, c);

      row.append(cell);
    }
  });
});

[3, 4, 5].forEach(r => {
  const cell = tables[1].rows[r].cells[1];
  cell.contentEditable = false;
  cell.textContent = 0;
});

const inputSmf = getElm("#inputSmf");
getElm("#buttonLoadSmf").addEventListener("click", () => {
  const files = inputSmf.files;
  if (!files.length) return;

  const reader = new FileReader();
  reader.readAsArrayBuffer(files[0]);

  reader.onload = () => {
    const midi = MidiParser.parse(new Uint8Array(reader.result));

    if (!midi) {
      alert("無効なMIDIファイルです。");
      return;
    }

    if (midi.format != 1) {
      alert("フォーマット1しか対応してません。申し訳ない...");
      return;
    }

    tickUnit = midi.tickUnit;
    inputTickUnit.value = tickUnit;

    const track = midi.tracks[selectTrack.selectedIndex];

    if (!track) {
      alert("トラックがありません。");
      return;
    }

    const events = track.events;
    const eventsLength = events.length;
    let notes = [];
    let lastNote = {};

    for (let i = 0; i < eventsLength; i ++) {
      const event = events[i];
      const { type, data } = event;

      if (type == 255 && event.meta == 1) {
        const text = data.toLowerCase();
        if (text == "mmstart") {
          notes = [];
          continue;
        }

        if (text == "mmend") break;
      }

      if (notes.length) notes[notes.length - 1].tick += event.dt;
      if (type == 9 && data[1] > 0) {
        const key = data[0];

        notes.push({ tick: 0, key });
        lastNote = { index: i, key, tick: event.tick };
      }
    }

    const notesLength = notes.length;
    if (!notesLength) {
      alert("そのトラックにはなんもありません。");
      return;
    }

    for (let i = lastNote.index; i < eventsLength; i ++) {
      const event = events[i];

      if (event.type == 8 && event.data[0] == lastNote.key) {
        notes[notesLength - 1].tick = event.tick - lastNote.tick;
        break;
      }
    }

    const baseKey = notes[0].key;

    selectNoteInput.selectedIndex = 0;
    changeNoteInput(false);

    stopPlay();
    clearRows(0, [2, 3, 4]);

    const row2Cells = tables[0].rows[2].cells;
    const row4Cells = tables[0].rows[4].cells;

    const minLength = Math.min(tableLength, notesLength);
    for (let c = 1; c <= minLength; c ++) {
      row2Cells[c].textContent = notes[c - 1].tick;
      row4Cells[c].textContent = notes[c - 1].key - baseKey;
    }

    calcAllNotes();
  }
});

const inputBeatValue = getElm("#inputBeatValue");
const spanBpm = getElm("#spanBpm");

let beatValue;
inputBeatValue.addEventListener("input", () => {
  beatValue = inputBeatValue.value;

  spanBpm.textContent = (beatValue == 0) ? "" : (3600 / beatValue).toFixed(3);
  calcAllNotes();
});

function calcNote(cellIndex) {
  const cell = tables[0].rows[2].cells[cellIndex];

  const text = cell.textContent;
  if (text == "") {
    clearCell(0, 3, cellIndex);
    return;
  }

  if (!isNum(beatValue)) {
    clearCell(0, 3, cellIndex);
    return;
  }

  let targetText;

  if (selectNoteInput.selectedIndex == 0) {
    if (!isNum(text, tickUnit)) {
      clearCell(0, 3, cellIndex);
      return;
    }

    targetText = beatValue * text / tickUnit;

  } else {
    const parts = text.match(/[\+\-]?\d+\.*/g);

    if (!parts) {
      clearCell(0, 3, cellIndex);
      return;
    }

    let sumNoteValue = 0;

    parts.forEach(part => {
      let noteValue = beatValue * 4 / part.replace(/[\+\-\.]/g, "");
      noteValue *= 2 - (2 ** -(part.match(/\./g) || []).length);

      sumNoteValue += (part.startsWith("-") ? -1 : 1) * noteValue;
    });

    if (!isNum(sumNoteValue)) {
      clearCell(0, 3, cellIndex);
      return;
    }

    targetText = sumNoteValue;
  }

  tables[0].rows[3].cells[cellIndex].textContent = targetText;
}

function calcAllNotes() {
  for (var c = 1; c <= tableLength; c ++) calcNote(c);
}

const selectInstrument = getElm("#selectInstrument");

let ac;
const instruments = ["sine", "triangle", "square", "sawtooth"];

let isPlaying = false;
let timeoutId;

function play() {
  isPlaying = true;

  if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();

  const rows = tables[0].rows;
  const cells = rows[0].cells;

  const gainNode = new GainNode(ac, { gain: 0.1 });

  function loop() {
    if (!isPlaying) return;

    if (c > tableLength) {
      resetPlayLighting();
      return;
    }

    const delay = rows[3].cells[c].textContent;
    const height = rows[4].cells[c].textContent;

    if (!isNum(delay, height)) {
      resetPlayLighting();
      return;
    }

    playSound(height, gainNode);

    if (c >= 2) cells[c - 1].classList.remove("playing");
    cells[c].classList.add("playing");
    c ++;

    timeoutId = setTimeout(loop, delay * 50 / 3);
  }

  let c = 1;
  loop();
}

function stopPlay() {
  isPlaying = false;

  resetPlayLighting();
  clearTimeout(timeoutId);
}

function resetPlayLighting() {
  const cells = tables[0].rows[0].cells;
  for (let c = 1; c <= tableLength; c ++) cells[c].classList.remove("playing");
}

const rootRatio = 2 ** (1 / 12);

function playSound(height, gainNode) {
  const oscNode = new OscillatorNode(ac, {
    type: instruments[selectInstrument.selectedIndex],
    frequency: 440 * rootRatio ** (18 - selectBaseKey.selectedIndex + parseInt(height))
  });

  oscNode.connect(gainNode).connect(ac.destination);

  oscNode.start();
  oscNode.stop(ac.currentTime + 0.1);
}

getElm("#buttonPlay").addEventListener("click", play);
getElm("#buttonStopPlay").addEventListener("click", stopPlay);

getElm("#buttonCalcTable0").addEventListener("click", () => {
  let totalDelay = 0;

  const table0Rows = tables[0].rows;
  const table1Rows = tables[1].rows;
  const baseHeight = table0Rows[4].cells[1].textContent;

  if (!isNum(baseHeight)) return;

  for (let c = 1; c <= tableLength; c ++) {
    const delay = table0Rows[3].cells[c].textContent;

    const isDelayNum = isNum(delay);
    table1Rows[2].cells[c].textContent = isDelayNum ? totalDelay : "";
    if (isDelayNum) totalDelay += parseFloat(delay);

    const height = table0Rows[4].cells[c].textContent;
    table1Rows[5].cells[c].textContent = isNum(height) ? height - baseHeight : ""
  }
});

selectLanding.addEventListener("change", () => {
  const index = selectLanding.selectedIndex;

  if (index == 0) clearRow(1, 3, 2);
  else {
    const wingType = dataAssets[typeKeys[0]];
    const landings = wingType[typeKeys[1]].landings;
    const landing = landings[index - 1];

    const cells = tables[1].rows[3].cells;
    cells[2].textContent = landing.second;

    const offset = parseInt(landing.name[0]);
    const blockDelays = wingType.blockDelays;

    for (let c = 3; c <= tableLength; c ++) {
      cells[c].textContent = blockDelays[(offset + c) % 3];
    }
  }
});

inputScrollSlownessAve.addEventListener("input", () => {
  if (selectLoading.selectedIndex != 3) return;

  const delay = inputScrollSlownessAve.value;
  const cells = tables[1].rows[4].cells;

  for (var c = 2; c <= tableLength; c ++) cells[c].textContent = delay;
});

inputScrollSlownessCycle.addEventListener("input", () => {
  const text = inputScrollSlownessCycle.value;
  const delays = text.split(",").map(delay => parseFloat(delay));

  const cells = tables[1].rows[4].cells;

  if (isNum(...delays)) {
    const length = delays.length;
    for (let c = 2; c <= tableLength; c ++) cells[c].textContent = delays[(c - 2) % length];

  } else clearRow(1, 4, 2);
});

function isWirable(delay, height, column) {
  let near = 0, far = 0;

  delay = Math.round(delay);

  const asset = dataAssets[typeKeys[0]][typeKeys[1]];
  const {
    relativeRailDelays, landings, accelerationsList, upOptions, gaps
  } = asset;

  const isWingWater = typeKeys[0] == "wing" && typeKeys[1] == "water";
  let accelerations;

  if (!isWingWater) {
    let accelerationType = "general";

    const landingIndex = selectLanding.selectedIndex;
    if (landingIndex != 0) {
      const landingType = landings[landingIndex - 1].name;

      if (column == 0) {
        accelerationType = {
          "1v": "vertical",
          "1d": "diagonal",
          "2a": "second"
        }[landingType] || accelerationType;

      } else if (
        typeKeys[0] == "wing" && typeKeys[1] == "ground"
        && (column == 1 && ["1v", "1d", "4a"].includes(landingType))
      ) accelerationType = "second";
    }

    accelerations = accelerationsList[accelerationType];
  }

  const accelerationsLen = accelerations?.length;
  function getAcceleration(distance) {
    if (isWingWater) return 0;

    return (distance <= accelerationsLen) ? accelerations[distance - 1] : 0;
  }

  const upOptionsLen = upOptions.length;
  const gapsLen = gaps.length;

  function addDownOption(_delay, _distance, count) {
    for (let g = 0; g < gapsLen; g ++) {
      const gap = gaps[g];

      let dDelay = 0;
      let d = 1;
      for (; ; d ++) {
        const distance = _distance - (gap.down + d * 2);
        if (distance <= 0) {
          if (d == 1) return;
          else break;
        }

        dDelay += relativeRailDelays[(gap.offset + d - 1) % 3];

        const optionDelay = _delay + gap.delay + dDelay;
        const totalDelay = optionDelay - getAcceleration(distance);

        const difference = totalDelay - delay;
        const error = Math.abs(difference);

        if (error <= 2) {
          switch (error) {
            case 0: return true;

            case 1:
              near = 1;
              break;

            case 2: far = 1;
          }
          break;

        } else if ((isWingWater ? -1 : 1) * difference > 0) break;

        if (count > 1) {
          const isMatch = addDownOption(optionDelay, distance, count - 1);
          if (isMatch) return true;
        }
      }
    }
  }

  for (let u = 0; u < upOptionsLen; u ++) {
    const upOption = upOptions[u];

    if (isWingWater && upOption.delay < delay) continue;

    let dDelay = 0;
    let d = 0;
    for (; ; d ++) {
      const distance = height - d * 2;
      if (distance <= 0) break;

      if (d != 0) dDelay += relativeRailDelays[(upOption.offset + d - 1) % 3];

      const startingDelay = upOption.delay + dDelay;
      const totalDelay = startingDelay - getAcceleration(distance);

      const difference = totalDelay - delay;
      const error = Math.abs(difference);

      if (error <= 2) {
        switch (error) {
          case 0: return 0;

          case 1:
            near = 1;
            break;

          case 2: far = 1;
        }
        break;

      } else if ((isWingWater ? -1 : 1) * difference > 0) break;

      const isMatch = addDownOption(startingDelay, distance, 3);
      if (isMatch) return 0;
    }

    if (d == 0) break;
  }

  if (near == 1) return 1;
  if (far == 1) return 2;
  return 3;
}

const inputBaseDelay = getElm("#inputBaseDelay");
const inputBaseHeight = getElm("#inputBaseHeight");
const spanEvals = getElm("#spanEvals");

function sortWirings() {
  let totalXDelay = 0;
  const wirings = [];

  const table1Rows = tables[1].rows;

  for (let c = 1; c <= tableLength; c ++) {
    const delay = table1Rows[2].cells[c].textContent;
    const xDelay = table1Rows[3].cells[c].textContent;

    const xScrollDelay = (selectLoading.selectedIndex == 3)
      ? table1Rows[4].cells[c].textContent : 0;
    let yScrollDelay = 0;

    const isWater = typeKeys[1] == "water";

    switch (selectLoading.selectedIndex) {
      case 1:
        yScrollDelay = -(isWater ? 32/3 : 4);
        break;

      case 2:
        yScrollDelay = paeseFloat(inputScrollSlownessAve.value);
    }

    const height = table1Rows[5].cells[c].textContent;

    const baseDelay = inputBaseDelay.value;
    const baseHeight = inputBaseHeight.value;

    if (!isNum(delay, xDelay, xScrollDelay, height, baseDelay, baseHeight)) break;

    totalXDelay += (parseFloat(xDelay) + parseFloat(xScrollDelay));
    wirings.push({
      index: c,
      delay:
        parseFloat(baseDelay) + parseFloat(delay)
        - parseInt(height) * (yScrollDelay + (isWater ? 16 : 4)),
      xDelay: totalXDelay,
      height: parseInt(baseHeight) + parseInt(height)
    });
  }

  const wiringsLen = wirings.length
  if (!wiringsLen) {
    if (isOverview) changeOverview(false);
    return;
  }

  let evals = [];

  for (let i = 0; i < wiringsLen; i ++) {
    const wiring = wirings[i];

    evals[i] ??= isWirable(wiring.delay - wiring.xDelay, wiring.height, i);
    if (evals[i] == 0) continue;

    const backI = wiringsLen - 1 - i;
    const shifts = [];

    for (let num = 1; num <= sortableRange; num ++) {
      if (i >= num) shifts.push(-num);
      if (backI >= num) shifts.push(num);
    }

    const movedEvals = [];
    const evalSums = [];

    shifts.forEach(shift => {
      if (shift > 0) {
        const shiftWiring = wirings[i + shift];
        evals[i + shift] ??= isWirable(
          shiftWiring.delay - shiftWiring.xDelay, shiftWiring.height, i + shift
        );
      }

      const origin = isWirable(
        wirings[i].delay - wirings[i + shift].xDelay, wirings[i].height, i + shift
      );
      const destination = isWirable(
        wirings[i + shift].delay - wirings[i].xDelay, wirings[i + shift].height, i
      );

      movedEvals.push({ shift, origin, destination });
      evalSums.push(origin + destination);
    });

    const movedEval = movedEvals[evalSums.indexOf(Math.min(...evalSums))];
    const { shift, origin, destination } = movedEval;

    if (origin + destination < evals[i] + evals[i + shift]) {
      [wirings[i], wirings[i + shift]] = [wirings[i + shift], wirings[i]];
      [wirings[i].xDelay, wirings[i + shift].xDelay] = [wirings[i + shift].xDelay, wirings[i].xDelay];

      evals[i] = destination;
      evals[i + shift] = origin;
    }
  }

  clearRows(2, [2, 3, 4], 1);
  getElm(".wiringDisplay")?.classList.remove("wiringDisplay");

  const table2Rows = tables[2].rows;
  for (let i = 0; i < wiringsLen; i ++) {
    const th = table2Rows[0].cells[i + 1];
    const movedInd = wirings[i].index;

    th.textContent = movedInd;
    if (i + 1 == movedInd) th.classList.remove("movedInd");
    else th.classList.add("movedInd");

    table2Rows[2].cells[i + 1].textContent = Math.round(wirings[i].delay - wirings[i].xDelay);
    table2Rows[3].cells[i + 1].textContent = wirings[i].height;
    table2Rows[4].cells[i + 1].textContent = ["◎", "○", "△", "×"][evals[i]];
  }

  const evalCounts = [0, 0, 0, 0];
  evals.forEach(e => evalCounts[e] ++);
  spanEvals.textContent = `
    ◎: ${evalCounts[0]}, ○: ${evalCounts[1]}, △: ${evalCounts[2]}, ×: ${evalCounts[3]}
  `;

  if (isOverview) changeOverview(true);
}

getElm("#buttonSortWirings").addEventListener("click", sortWirings);

function setCanvasSize(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

let isOverview = false;
const canvasOverview = getElm("#canvasOverview");
const canvasOverviewSelect = getElm("#canvasOverviewSelect");

function changeOverview(isShow) {
  if (isShow) {
    const heights = [];

    const cells = tables[2].rows[3].cells;
    for (let c = 1; c <= tableLength; c ++) {
      const height = cells[c].textContent;

      if (!isNum(height)) break;
      heights.push(height);
    }

    if (!heights.length) return;

    isOverview = true;
    changeVisible(canvasOverview, true);

    const maxHeight = Math.max(...heights);
    const xTilesLen = heights.length;
    const yTilesLen = maxHeight - Math.min(...heights) + 3;

    const [canvasWidth, canvasHeight] = [16 * xTilesLen, 16 * yTilesLen];

    canvasOverview.parentNode.style.height = `${canvasHeight}px`;
    [canvasOverview, canvasOverviewSelect].forEach(canvas => {
      setCanvasSize(canvas, canvasWidth, canvasHeight);
    });

    const distances = heights.map(height => maxHeight - height);
    const context = canvasOverview.getContext("2d");
    context.imageSmoothingEnabled = false;

    const space = new Image();
    space.src = `images/railParts/space.png`;

    space.onload = () => {
      context.globalAlpha = 0.6;

      for (let x = 0; x < xTilesLen; x ++) {
        for (let y = 0; y < yTilesLen; y ++) {
          context.drawImage(space, 16 * x, 16 * y, 16, 16);
        }
      }

      context.globalAlpha = 1;

      ["openU", "note", "openD"].forEach((name, p) => {
        const image = new Image();
        image.src = `images/railParts/${name}.png`;

        image.onload = () => {
          distances.forEach((distance, x) => {
            context.drawImage(image, 16 * x, 16 * (distance + p), 16, 16);
          });
        }
      });
    }

  } else {
    isOverview = false;
    changeVisible(canvasOverview, false);
  }
}

getElm("#buttonChangeOverview").addEventListener("click", () => changeOverview(!isOverview));

canvasOverviewSelect.addEventListener("click", event => {
  let x = event.clientX - event.target.getBoundingClientRect().left;

  const canvasWidth = canvasOverview.width;

  if (x < 0) x = 0;
  if (x > canvasWidth) x = canvasWidth;

  const tile = parseInt(x / 16);
  tables[2].rows[5].cells[tile + 1].click();
});

document.addEventListener("keydown", event => {
  const key = event.key;
  const index = ["ArrowLeft", "ArrowRight"].indexOf(key);
  if (index == -1) return;

  const selectedCell = getElm("td.wiringDisplay");
  if (!selectedCell) return;

  const destinationInd = selectedCell.cellIndex + [-1, 1][index];
  if (destinationInd < 1 || destinationInd > tableLength) return;

  tables[2].rows[5].cells[destinationInd].click();
  event.preventDefault();
});

const selectWiringType = getElm("#selectWiringType");
Array.from(selectType.options).forEach(option => {
  selectWiringType.append(option.cloneNode(true));
});

const selectWiringLanding = getElm("#selectWiringLanding");

function changeWiringType() {
  let keys = selectWiringType.value.split("-");
  selectWiringLanding.options.length = 0;

  if (keys[1] == "water") keys = ["noWing", "ground"];

  const landingKeys = Object.keys(dataAssets[keys[0]][keys[1]].accelerationsList);
  landingKeys.forEach(key => addOption(selectWiringLanding, landingNames[key], key));
}

changeWiringType();
selectWiringType.addEventListener("change", changeWiringType);

const inputWiringDelay = getElm("#inputWiringDelay");
const inputWiringHeight = getElm("#inputWiringHeight");
const selectWiringOrder = getElm("#selectWiringOrder");

function findWiringResults(delay, height) {
  const resultsList = [[], [], []];

  const keys = selectWiringType.value.split("-");
  const asset = dataAssets[keys[0]][keys[1]];
  const {
    relativeRailDelays, accelerationsList, upOptions, gaps
  } = asset;

  const isWingWater = keys[0] == "wing" && typeKeys[1] == "water";
  let accelerations;

  if (!isWingWater) accelerations = accelerationsList[selectWiringLanding.value];

  const accelerationsLen = accelerations?.length;
  function getAcceleration(distance) {
    if (isWingWater) return 0;

    return (distance <= accelerationsLen) ? accelerations[distance - 1] : 0;
  }

  const upOptionsLen = upOptions.length;
  const gapsLen = gaps.length;

  function addDownOption(_delay, _distance, count, _str) {
    for (let g = 0; g < gapsLen; g ++) {
      const gap = gaps[g];

      let dDelay = 0;
      let d = 1;
      for (; ; d ++) {
        const distance = _distance - (gap.down + d * 2);
        if (distance <= 0) {
          if (d == 1) return;
          else break;
        }

        dDelay += relativeRailDelays[(gap.offset + d - 1) % 3];

        const optionDelay = _delay + gap.delay + dDelay;
        const totalDelay = optionDelay - getAcceleration(distance);

        const str = `${_str}G${gap.down}R${d}`;

        const difference = totalDelay - delay;
        const error = Math.abs(difference);

        if (error <= 2) {
          resultsList[error].push({
            delay: totalDelay,
            up: startingUp,
            down: height - distance,
            str
          });
          break;

        } else if ((isWingWater ? -1 : 1) * difference > 0) break;

        if (count > 1) addDownOption(optionDelay, distance, count - 1, str);
      }
    }
  }

  let startingUp;

  for (let u = 0; u < upOptionsLen; u ++) {
    const upOption = upOptions[u];
    startingUp = upOption.up;

    if (isWingWater && upOption.delay < delay) continue;

    let dDelay = 0;
    let d = 0;
    for (; ; d ++) {
      const startingDown = d * 2;
      const distance = height - startingDown;
      if (distance <= 0) break;

      if (d != 0) dDelay += relativeRailDelays[(upOption.offset + d - 1) % 3];

      const startingDelay = upOption.delay + dDelay;
      const totalDelay = startingDelay - getAcceleration(distance);

      const str = `${upOption.str}-${(d == 0) ? "" : "R" + d}`;

      const difference = totalDelay - delay;
      const error = Math.abs(difference);

      if (error <= 2) {
        resultsList[error].push({
          delay: totalDelay,
          up: startingUp,
          down: startingDown,
          str
        });
        break;

      } else if ((isWingWater ? -1 : 1) * difference > 0) break;

      addDownOption(startingDelay, distance, 3, str);
    }

    if (d == 0) break;
  }

  return resultsList;
}

const canvasWiring = getElm("#canvasWiring");

const partsNames = [
  "noteU", "noteD", "space", "openU", "openD", "close", "connection", "middle"
];

function drawWiring(str) {
  const direction = str[0];
  const optsList = [];
  const parts = [];

  str.split("-").forEach(optionsStr => {
    optsList.push(optionsStr.match(/[RGF]\d*/g) || []);
  });

  if (direction == "↑") {
    optsList[0].forEach((option, i) => {
      switch (option[0]) {
        case "R":
          if (i == 0) {
            if (option[1] == 0) parts.unshift(5);
            else {
              parts.unshift(6);
              [...Array(option[1] - 1)].forEach(() => parts.unshift(6, 7));
              parts.unshift(((i < optsList[0].length - 1) ? 3 : 5), 7);
            }

          } else {
            parts.unshift(4);
            [...Array(option[1] - 1)].forEach(() => parts.unshift(6, 7));
            parts.unshift(((i < optsList[0].length - 1) ? 3 : 5), 7);
          }
          break;

        case "G":
          if (i == 0) parts.unshift(3);
          [...Array(option[1] - 1)].forEach(() => parts.unshift(2));
          break;

        case "F": if (i == 0) parts.unshift(3);
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
      parts.push((i == 0) ? 6 : 3);
      [...Array(option[1] - 1)].forEach(() => parts.push(7, 6));
      parts.push(7, 4);

    } else {
      if (i == 0) parts.push(4);
      [...Array(option.slice(1) - 1)].forEach(() => parts.push(2));
    }
  });

  const context = canvasWiring.getContext("2d");

  const canvasHeight = 32 * parts.length;
  canvasWiring.height = canvasHeight;
  canvasWiring.style.height = `${canvasHeight}px`;

  context.imageSmoothingEnabled = false;

  parts.forEach((part, i) => {
    const image = new Image();
    image.src = `images/railParts/${partsNames[`${part}`[0]]}.png`;

    image.onload = () => context.drawImage(image, 0, 32 * i, 32, 32);
  });
}

const spanWiringResults = getElmAll(".spanWiringResults");
const checkWiringView = getElm("#checkWiringView");

let resultsList;

function setWiringResult() {
  if (!resultsList) return;
  const sortIndex = selectWiringOrder.selectedIndex;

  resultsList.forEach(results => {
    results.sort((a, b) => {
      return [
        () => a.up - b.up || a.down - b.down,
        () => b.up - a.up || a.down - b.down,
        () => a.down - b.down || a.up - b.up,
        () => b.down - a.down || a.up - b.up
      ][sortIndex]();
    });
  });

  spanWiringResults.forEach((container, i) => {
    while (container.firstChild) container.removeChild(container.firstChild);

    resultsList[i].forEach(result => {
      const span = document.createElement("span");

      span.textContent = `${result.str}, `;
      span.title = `遅延: ${result.delay}, ↑: ${result.up}, ↓: ${result.down}`;
      span.addEventListener("click", () => drawWiring(result.str));

      container.append(span);
    });
  });

  if (checkWiringView.checked) {
    if (spanWiringResults[0].firstChild) {
      spanWiringResults[0]?.firstChild.click();

    } else {
      canvasWiring.height = 320;
      canvasWiring.style.height = "320px";
    }
  }
}

function findWiring() {
  const [delay, height] = [inputWiringDelay.value, inputWiringHeight.value];
  if (!isNum(delay, height)) {
    spanWiringResults.forEach(container => {
      while (container.firstChild) container.removeChild(container.firstChild);
    });

    canvasWiring.height = 320;
    canvasWiring.style.height = "320px";
    return;
  }

  resultsList = findWiringResults(parseInt(delay), parseInt(height));
  setWiringResult();
}

getElm("#buttonFindWiring").addEventListener("click", findWiring);
selectWiringOrder.addEventListener("change", setWiringResult);

[...partsNames, "note"].forEach(name => {
  const img = document.createElement("img");
  img.src = `images/railParts/${name}.png`;
});
