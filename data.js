"use strict";

const dataAssets = {
  wing: {
    blockDelays: [10, 11, 11],

    ground: {
      relativeRailDelays: [13, 13, 14],

      landings: [
        { name: "1v", second: 9 },
        { name: "1d", second: 10 },
        { name: "2a", second: 11 },
        { name: "2b", second: 11 },
        { name: "3", second: 11 },
        { name: "4a", second: 10 },
        { name: "4b", second: 10 }
      ],

      accelerationsList: {
        general: [11, 8, 5, 3, 2, 1, 1],
        second: [11, 8, 5, 3, 2, 1],
        vertical: [10, 7, 4, 3, 1, 1, -1],
        diagonal: [10, 7, 4, 2, 1, 0, -1]
      },

      upOptions: [
        { delay: 0, str: "↓", up: 0, offset: 2 },
        { delay: 21, str: "↑R0", up: 0, offset: 1 },
        { delay: 64, str: "↑R1", up: 2, offset: 2 },
        { delay: 82, str: "↑G1R1", up: 3, offset: 0 },
        { delay: 98, str: "↑G2R1", up: 4, offset: 2 },
        { delay: 107, str: "↑R2", up: 4, offset: 0 },
        { delay: 111, str: "↑F", up: 0, offset: 0 },
        { delay: 120, str: "↑G3R1", up: 5, offset: 0 },
        { delay: 124, str: "↑G1R2", up: 5, offset: 0 },
        { delay: 125, str: "↑R1G1R1", up: 5, offset: 1 },
        { delay: 140, str: "↑G2R2", up: 6, offset: 2 },
        { delay: 142, str: "↑R1G2R1", up: 6, offset: 0 },
        { delay: 149, str: "↑R3", up: 6, offset: 1 },
        { delay: 154, str: "↑R1F", up: 2, offset: 1 },
        { delay: 159, str: "↑G1R1G2R1", up: 7, offset: 0 },
        { delay: 159, str: "↑G2R1G1R1", up: 7, offset: 2 },
        { delay: 162, str: "↑G3R2", up: 7, offset: 0 },
        { delay: 163, str: "↑R1G3R1", up: 7, offset: 1 },
        { delay: 167, str: "↑G1R3", up: 7, offset: 0 },
        { delay: 167, str: "↑R1G1R2", up: 5, offset: 1 },
        { delay: 167, str: "↑R2G1R1", up: 5, offset: 2 },
        { delay: 172, str: "↑G1R1F", up: 3, offset: 0 },
        { delay: 175, str: "↑G2R1G2R1", up: 8, offset: 2 },
        { delay: 184, str: "↑R1G2R2", up: 8, offset: 0 },
        { delay: 184, str: "↑R2G2R1", up: 8, offset: 1 },
        { delay: 184, str: "↑G2R3", up: 8, offset: 2 },
        { delay: 188, str: "↑G2R1F", up: 4, offset: 2 },
        { delay: 192, str: "↑R4", up: 8, offset: 2 },
        { delay: 196, str: "↑R2F", up: 4, offset: 2 },
        { delay: 197, str: "↑G3R1G2R1", up: 9, offset: 0 },
        { delay: 197, str: "↑G2R1G3R1", up: 9, offset: 2 },
        { delay: 202, str: "↑G1R2G2R1", up: 9, offset: 0 },
        { delay: 202, str: "↑G2R1G1R2", up: 9, offset: 2 },
        { delay: 205, str: "↑G3R3", up: 9, offset: 0 },
        { delay: 205, str: "↑R1G3R2", up: 9, offset: 1 },
        { delay: 205, str: "↑R2G3R1", up: 9, offset: 2 },
        { delay: 209, str: "↑R2G1R2", up: 9, offset: 2 },
        { delay: 210, str: "↑G3R1F", up: 5, offset: 0 },
        { delay: 210, str: "↑R1G1R3", up: 9, offset: 1 },
        { delay: 214, str: "↑G1R2F", up: 5, offset: 0 },
        { delay: 230, str: "↑G2R2F", up: 6, offset: 2 },
        { delay: 232, str: "↑R1G2R1F", up: 6, offset: 0 },
        { delay: 235, str: "↑R5", up: 10, offset: 0 },
        { delay: 239, str: "↑R3F", up: 6, offset: 0 }
      ],

      gaps: [
        { delay: 5, down: 1, offset: 2 },
        { delay: 9, down: 2, offset: 1 },
        { delay: 11, down: 3, offset: 2 },
        { delay: 13, down: 4, offset: 1 },
        { delay: 14, down: 5, offset: 2 },
        { delay: 15, down: 6, offset: 1 },
        { delay: 16, down: 8, offset: 0 },
        { delay: 16, down: 9, offset: 0 },
        { delay: 16, down: 10, offset: 0 },
        { delay: 16, down: 7, offset: 2 }
      ]
    },

    water: {
      relativeRailDelays: [-11, -11, -10],

      landings: [
        { name: "1v", second: 8 },
        { name: "1d", second: 9 },
        { name: "2", second: 11 },
        { name: "3", second: 11 },
        { name: "4", second: 10 }
      ],

      upOptions: [
        { delay: 0, str: "↓", up: 0, offset: 2 },
        { delay: 21, str: "↑R0", up: 0, offset: 1 },
        { delay: 64, str: "↑R1", up: 2, offset: 2 },
        { delay: 94, str: "↑G1R1", up: 3, offset: 2 },
        { delay: 107, str: "↑R2", up: 4, offset: 0 },
        { delay: 129, str: "↑G2R1", up: 4, offset: 2 },
        { delay: 137, str: "↑G1R2", up: 5, offset: 2 },
        { delay: 138, str: "↑R1G1R1", up: 5, offset: 0 },
        { delay: 149, str: "↑R3", up: 6, offset: 1 },
        { delay: 167, str: "↑G1R1G1R1", up: 6, offset: 2 },
        { delay: 172, str: "↑G2R2", up: 6, offset: 2 },
        { delay: 173, str: "↑R1G2R1", up: 6, offset: 0 },
        { delay: 175, str: "↑G3R1", up: 5, offset: 2 },
        { delay: 180, str: "↑R2G1R1", up: 7, offset: 1 },
        { delay: 180, str: "↑G1R3", up: 7, offset: 2 },
        { delay: 181, str: "↑R1G1R2", up: 7, offset: 0 },
        { delay: 192, str: "↑R4", up: 8, offset: 2 },
        { delay: 201, str: "↑F", up: 0, offset: 0 },
        { delay: 202, str: "↑G1R1G2R1", up: 7, offset: 2 },
        { delay: 202, str: "↑G2R1G1R1", up: 7, offset: 2 },
        { delay: 210, str: "↑G1R1G1R2", up: 8, offset: 2 },
        { delay: 211, str: "↑R1G1R1G1R1", up: 8, offset: 0 },
        { delay: 211, str: "↑G1R2G1R1", up: 8, offset: 2 },
        { delay: 215, str: "↑R2G2R1", up: 8, offset: 1 },
        { delay: 215, str: "↑G2R3", up: 8, offset: 2 },
        { delay: 216, str: "↑R1G2R2", up: 8, offset: 0 },
        { delay: 217, str: "↑G3R2", up: 7, offset: 2 },
        { delay: 218, str: "↑R1G3R1", up: 7, offset: 0 },
        { delay: 222, str: "↑R3G1R1", up: 9, offset: 2 },
        { delay: 223, str: "↑R2G1R2", up: 9, offset: 1 },
        { delay: 224, str: "↑R1G1R3", up: 9, offset: 0 },
        { delay: 235, str: "↑R5", up: 10, offset: 0 },
        { delay: 237, str: "↑G2R1G2R1", up: 8, offset: 2 },
        { delay: 244, str: "↑R1F", up: 2, offset: 1 },
        { delay: 245, str: "↑G1R1G2R2", up: 9, offset: 2 },
        { delay: 245, str: "↑G2R1G1R2", up: 9, offset: 2 },
        { delay: 246, str: "↑R1G1R1G2R1", up: 9, offset: 0 },
        { delay: 246, str: "↑R1G2R1G1R1", up: 9, offset: 0 },
        { delay: 246, str: "↑G1R2G2R1", up: 9, offset: 2 },
        { delay: 246, str: "↑G2R2G1R1", up: 9, offset: 2 },
        { delay: 247, str: "↑G1R1G3R1", up: 8, offset: 2 },
        { delay: 248, str: "↑G3R1G1R1", up: 8, offset: 2 },
        { delay: 253, str: "↑R2G1R1G1R1", up: 10, offset: 1 },
        { delay: 253, str: "↑G1R3G1R1", up: 10, offset: 2 },
        { delay: 254, str: "↑R1G1R1G1R2", up: 10, offset: 0 },
        { delay: 254, str: "↑G1R2G1R2", up: 10, offset: 2 },
        { delay: 255, str: "↑R1G1R2G1R1", up: 10, offset: 0 },
        { delay: 257, str: "↑R3G2R1", up: 10, offset: 2 },
        { delay: 258, str: "↑R2G2R2", up: 10, offset: 1 },
        { delay: 259, str: "↑R1G2R3", up: 10, offset: 0 },
        { delay: 260, str: "↑R1G3R2", up: 9, offset: 0 },
        { delay: 260, str: "↑R2G3R1", up: 9, offset: 1 },
        { delay: 260, str: "↑G3R3", up: 9, offset: 2 },
        { delay: 274, str: "↑G1R1F", up: 3, offset: 2 },
        { delay: 280, str: "↑G2R1G2R2", up: 10, offset: 2 },
        { delay: 281, str: "↑R1G2R1G2R1", up: 10, offset: 0 },
        { delay: 281, str: "↑G2R2G2R1", up: 10, offset: 2 },
        { delay: 282, str: "↑G2R1G3R1", up: 9, offset: 2 },
        { delay: 283, str: "↑G3R1G2R1", up: 9, offset: 2 },
        { delay: 286, str: "↑R2F", up: 4, offset: 2 },
        { delay: 289, str: "↑G1R1G3R2", up: 10, offset: 2 },
        { delay: 291, str: "↑R1G1R1G3R1", up: 10, offset: 0 },
        { delay: 291, str: "↑R1G3R1G1R1", up: 10, offset: 0 },
        { delay: 291, str: "↑G1R2G3R1", up: 10, offset: 2 },
        { delay: 291, str: "↑G3R1G1R2", up: 10, offset: 2 },
        { delay: 291, str: "↑G3R2G1R1", up: 10, offset: 2 }
      ],

      gaps: [
        { delay: 1, down: 1, offset: 1 }
      ]
    }
  },

  noWing: {
    blockDelays: [21, 21, 22],

    ground: {
      relativeRailDelays: [34, 35, 35],

      landings: [
        { name: "1v", second: 17 },
        { name: "1d", second: 17 },
        { name: "2", second: 21 },
        { name: "3", second: 22 },
        { name: "4", second: 21 }
      ],

      accelerationsList: {
        general: [17, 11, 7, 5, 3, 1],
        vertical: [18, 13, 10, 6, 4, 5, 5, 2, 1],
        diagonal: [18, 12, 9, 6, 4, 4, 3, 2, 1]
      },

      upOptions: [
        { delay: 0, str: "↓", up: 0, offset: 2 },
        { delay: 42, str: "↑R0", up: 0, offset: 1 },
        { delay: 88, str: "↑F", up: 0, offset: 0 },
        { delay: 128, str: "↑R1", up: 2, offset: 2 },
        { delay: 169, str: "↑G1R1", up: 3, offset: 0 },
        { delay: 173, str: "↑R1F", up: 2, offset: 1 },
        { delay: 213, str: "↑R2", up: 4, offset: 0 },
        { delay: 215, str: "↑G1R1F", up: 3, offset: 0 },
        { delay: 254, str: "↑G1R2", up: 5, offset: 0 },
        { delay: 254, str: "↑R1G1R1", up: 5, offset: 1 },
        { delay: 258, str: "↑R2F", up: 4, offset: 2 },
        { delay: 296, str: "↑G1R1G1R1", up: 6, offset: 0 },
        { delay: 298, str: "↑R3", up: 6, offset: 1 },
        { delay: 299, str: "↑G1R2F", up: 5, offset: 0 },
        { delay: 300, str: "↑R1G1R1F", up: 5, offset: 1 },
        { delay: 339, str: "↑R1G1R2", up: 7, offset: 1 },
        { delay: 339, str: "↑R2G1R1", up: 7, offset: 2 },
        { delay: 340, str: "↑G1R3", up: 7, offset: 0 },
        { delay: 342, str: "↑G1R1G1R1F", up: 6, offset: 0 },
        { delay: 344, str: "↑R3F", up: 6, offset: 0 },
        { delay: 380, str: "↑G1R2G1R1", up: 8, offset: 0 },
        { delay: 381, str: "↑G1R1G1R2", up: 8, offset: 0 },
        { delay: 381, str: "↑R1G1R1G1R1", up: 8, offset: 1 },
        { delay: 384, str: "↑R1G1R2F", up: 7, offset: 1 },
        { delay: 384, str: "↑R4", up: 8, offset: 2 },
        { delay: 385, str: "↑G1R3F", up: 7, offset: 0 },
        { delay: 385, str: "↑R2G1R1F", up: 7, offset: 2 },
        { delay: 424, str: "↑R2G1R2", up: 9, offset: 2 },
        { delay: 425, str: "↑R3G1R1", up: 9, offset: 0 },
        { delay: 425, str: "↑R1G1R3", up: 9, offset: 1 },
        { delay: 426, str: "↑G1R1G1R2F", up: 8, offset: 0 },
        { delay: 426, str: "↑G1R2G1R1F", up: 8, offset: 0 },
        { delay: 427, str: "↑R1G1R1G1R1F", up: 8, offset: 1 },
        { delay: 429, str: "↑R4F", up: 8, offset: 1 },
        { delay: 465, str: "↑G1R2G1R2", up: 10, offset: 0 },
        { delay: 465, str: "↑R1G1R2G1R1", up: 10, offset: 1 },
        { delay: 466, str: "↑G1R3G1R1", up: 10, offset: 0 },
        { delay: 466, str: "↑R1G1R1G1R2", up: 10, offset: 1 },
        { delay: 466, str: "↑R2G1R1G1R1", up: 10, offset: 2 },
        { delay: 469, str: "↑R5", up: 10, offset: 0 },
        { delay: 469, str: "↑R2G1R2F", up: 9, offset: 2 },
        { delay: 470, str: "↑R1G1R3F", up: 9, offset: 1 },
        { delay: 471, str: "↑R3G1R1F", up: 9, offset: 0 },
        { delay: 510, str: "↑G1R2G1R2F", up: 10, offset: 0 },
        { delay: 511, str: "↑R1G1R1G1R2F", up: 10, offset: 1 },
        { delay: 511, str: "↑R1G1R2G1R1F", up: 10, offset: 1 },
        { delay: 512, str: "↑G1R3G1R1F", up: 10, offset: 0 },
        { delay: 512, str: "↑R2G1R1G1R1F", up: 10, offset: 2 },
        { delay: 514, str: "↑R5F", up: 10, offset: 2 }
      ],

      gaps: [
        { delay: 12, down: 1, offset: 2 },
        { delay: 18, down: 2, offset: 0 },
        { delay: 21, down: 3, offset: 0 },
        { delay: 25, down: 4, offset: 0 },
        { delay: 25, down: 6, offset: 1 },
        { delay: 26, down: 7, offset: 0 },
        { delay: 26, down: 5, offset: 1 },
        { delay: 28, down: 8, offset: 1 },
        { delay: 30, down: 9, offset: 0 },
        { delay: 30, down: 10, offset: 2 },
        { delay: 30, down: 11, offset: 2 },
        { delay: 30, down: 12, offset: 2 }
      ]
    },

    water: {
      relativeRailDelays: [10, 11, 11],

      landings: [
        { name: "1v", second: 16 },
        { name: "1d", second: 18 },
        { name: "2", second: 21 },
        { name: "3", second: 22 },
        { name: "4", second: 21 }
      ],

      accelerationsList: {
        general: [5],
        vertical: [4],
        diagonal: [4]
      },

      upOptions: [
        { delay: 0, str: "↓", up: 0, offset: 2 },
        { delay: 42, str: "↑R0", up: 0, offset: 1 },
        { delay: 128, str: "↑R1", up: 2, offset: 2 },
        { delay: 129, str: "↑F", up: 0, offset: 1 },
        { delay: 198, str: "↑G1R1", up: 3, offset: 0 },
        { delay: 213, str: "↑R2", up: 4, offset: 0 },
        { delay: 215, str: "↑R1F", up: 2, offset: 2 },
        { delay: 283, str: "↑G1R2", up: 5, offset: 0 },
        { delay: 283, str: "↑R1G1R1", up: 5, offset: 1 },
        { delay: 285, str: "↑G1R1F", up: 3, offset: 0 },
        { delay: 298, str: "↑R3", up: 6, offset: 1 },
        { delay: 300, str: "↑R2F", up: 4, offset: 0 },
        { delay: 354, str: "↑G1R1G1R1", up: 6, offset: 0 },
        { delay: 368, str: "↑R1G1R2", up: 7, offset: 1 },
        { delay: 368, str: "↑R2G1R1", up: 7, offset: 2 },
        { delay: 369, str: "↑G1R3", up: 7, offset: 0 },
        { delay: 370, str: "↑G1R2F", up: 5, offset: 0 },
        { delay: 370, str: "↑R1G1R1F", up: 5, offset: 1 },
        { delay: 384, str: "↑R4", up: 8, offset: 2 },
        { delay: 385, str: "↑R3F", up: 6, offset: 1 },
        { delay: 438, str: "↑G1R2G1R1", up: 8, offset: 0 },
        { delay: 439, str: "↑G1R1G1R2", up: 8, offset: 0 },
        { delay: 439, str: "↑R1G1R1G1R1", up: 8, offset: 1 },
        { delay: 441, str: "↑G1R1G1R1F", up: 6, offset: 0 },
        { delay: 453, str: "↑R2G1R2", up: 9, offset: 2 },
        { delay: 454, str: "↑R3G1R1", up: 9, offset: 0 },
        { delay: 454, str: "↑R1G1R3", up: 9, offset: 1 },
        { delay: 455, str: "↑R1G1R2F", up: 7, offset: 1 },
        { delay: 455, str: "↑R2G1R1F", up: 7, offset: 2 },
        { delay: 456, str: "↑G1R3F", up: 7, offset: 0 },
        { delay: 469, str: "↑R5", up: 10, offset: 0 },
        { delay: 471, str: "↑R4F", up: 8, offset: 2 },
        { delay: 523, str: "↑G1R2G1R2", up: 10, offset: 0 },
        { delay: 523, str: "↑R1G1R2G1R1", up: 10, offset: 1 },
        { delay: 524, str: "↑G1R3G1R1", up: 10, offset: 0 },
        { delay: 524, str: "↑R1G1R1G1R2", up: 10, offset: 1 },
        { delay: 524, str: "↑R2G1R1G1R1", up: 10, offset: 2 },
        { delay: 525, str: "↑G1R2G1R1F", up: 8, offset: 0 },
        { delay: 526, str: "↑G1R1G1R2F", up: 8, offset: 0 },
        { delay: 526, str: "↑R1G1R1G1R1F", up: 8, offset: 1 },
        { delay: 540, str: "↑R2G1R2F", up: 9, offset: 2 },
        { delay: 541, str: "↑R3G1R1F", up: 9, offset: 0 },
        { delay: 541, str: "↑R1G1R3F", up: 9, offset: 1 },
        { delay: 556, str: "↑R5F", up: 10, offset: 0 }
      ],

      gaps: [
        { delay: 12, down: 1, offset: 2 },
        { delay: 16, down: 2, offset: 2 },
        { delay: 16, down: 3, offset: 1 },
        { delay: 16, down: 4, offset: 1 },
        { delay: 16, down: 5, offset: 1 },
        { delay: 16, down: 6, offset: 1 },
        { delay: 16, down: 7, offset: 1 },
        { delay: 16, down: 8, offset: 1 },
        { delay: 16, down: 9, offset: 1 },
      ]
    },
  }
};

const landingNames = {
  general: "通常",
  second: "2マス目",
  vertical: "垂直",
  diagonal: "斜め"
};