/**
 * BattleTech Mech Database
 * Base BV assumes Gunnery 4/Piloting 5 skills
 *
 * movement: [walk, run, jump]
 * armor: [head, CT, CTr, LT, LTr, RT, RTr, LA, RA, LL, RL]
 * structure: [head, CT, LT, RT, LA, RA, LL, RL] (no rear locations)
 * criticals: head/legs are single arrays, arms/torsos are nested arrays [column1, column2]
 *            trailing nulls should be removed, but internal nulls are preserved
 */

export const mechs = [
  {
    id: 'lct-1e',
    name: 'Locust',
    variant: 'LCT-1E',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 9
    },
    tonnage: 20,
    bv: 553,
    role: 'Scout',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [8, 12, 0],
    armor: [8, 10, 2, 8, 2, 8, 2, 4, 4, 8, 8],
    structure: [3, 6, 4, 4, 2, 2, 4, 4],

    weapons: [
      {
        name: 'Medium Laser',
        location: 'RA',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'Small Laser',
        location: 'LA',
        heat: 1,
        damage: 3,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3
      },
      {
        name: 'Small Laser',
        location: 'LA',
        heat: 1,
        damage: 3,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3
      },
      {
        name: 'Medium Laser',
        location: 'LA',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Small Laser'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Small Laser']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser']
      ],
      leftTorso: [[], []],
      rightTorso: [[], []],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO'],
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 10,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'fs9-m',
    name: 'Firestarter',
    variant: 'FS9-M',
    variant_name: 'Mirage',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 47
    },
    tonnage: 35,
    bv: 798,
    role: 'Scout',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [6, 9, 6],
    armor: [9, 16, 6, 10, 4, 10, 4, 12, 12, 16, 16],
    structure: [3, 11, 7, 7, 5, 5, 8, 8],

    weapons: [
      {
        name: 'Machine Gun',
        location: 'RT',
        heat: 0,
        damage: 2,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3
      },
      {
        name: 'Machine Gun',
        location: 'RT',
        heat: 0,
        damage: 2,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3
      },
      {
        name: 'Medium Laser',
        location: 'RA',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'Small Laser',
        location: 'RA',
        heat: 1,
        damage: 3,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3
      },
      {
        name: 'Small Laser',
        location: 'LA',
        heat: 1,
        damage: 3,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3
      },
      {
        name: 'Medium Laser',
        location: 'LA',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      }
    ],

    ammo: [
      { type: 'Machine Gun', rounds: 200 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', 'SENSORS', 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Small Laser']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Small Laser']
      ],
      leftTorso: [
        ['HEAT_SINK', 'HEAT_SINK', 'JUMP_JET'],
        ['Machine Gun']
      ],
      rightTorso: [
        ['HEAT_SINK', 'JUMP_JET', 'Machine Gun'],
        ['Ammo (Machine Gun) 200']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO'],
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET', 'JUMP_JET'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET', 'JUMP_JET']
    },

    heat: {
      heatSinks: 11,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'bj-1x',
    name: 'Blackjack',
    variant: 'BJ-1X',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 97
    },
    tonnage: 45,
    bv: 964,
    role: 'Skirmisher',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [5, 8, 0],
    armor: [9, 18, 9, 16, 6, 16, 6, 16, 16, 17, 17],
    structure: [3, 14, 9, 9, 6, 6, 9, 9],

    weapons: [
      {
        name: 'Medium Laser',
        location: 'RT',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'Medium Laser',
        location: 'LT',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'Flamer',
        location: 'RA',
        heat: 3,
        damage: 2,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3,
        special: '+2 Heat to target'
      },
      {
        name: 'Flamer',
        location: 'RA',
        heat: 3,
        damage: 2,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3,
        special: '+2 Heat to target'
      },
      {
        name: 'Flamer',
        location: 'LA',
        heat: 3,
        damage: 2,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3,
        special: '+2 Heat to target'
      },
      {
        name: 'Flamer',
        location: 'LA',
        heat: 3,
        damage: 2,
        minRange: 0,
        shortRange: 1,
        mediumRange: 2,
        longRange: 3,
        special: '+2 Heat to target'
      },
      {
        name: 'Medium Laser',
        location: 'LA',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', 'SENSORS', 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Flamer'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Flamer']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Flamer'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Flamer']
      ],
      leftTorso: [
        ['HEAT_SINK', 'HEAT_SINK', 'HEAT_SINK', 'Medium Laser'],
        []
      ],
      rightTorso: [
        ['HEAT_SINK', 'HEAT_SINK', 'HEAT_SINK', 'Medium Laser'],
        []
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO'],
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 18,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'glt-4p',
    name: 'Guillotine',
    variant: 'GLT-4P',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 198
    },
    tonnage: 70,
    bv: 1376,
    role: 'Skirmisher',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [4, 6, 4],
    armor: [9, 33, 9, 21, 9, 21, 9, 16, 16, 21, 21],
    structure: [3, 21, 12, 12, 9, 9, 12, 12],

    weapons: [
      {
        name: 'SRM 6',
        location: 'RT',
        heat: 4,
        damage: '2/Msl',
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'Medium Laser',
        location: 'RT',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'Medium Laser',
        location: 'LT',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'Medium Laser',
        location: 'RA',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'PPC',
        location: 'RA',
        heat: 10,
        damage: 10,
        minRange: 3,
        shortRange: 6,
        mediumRange: 12,
        longRange: 18
      }
    ],

    ammo: [
      { type: 'SRM 6', rounds: 15 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'PPC'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'PPC']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser']
      ],
      leftTorso: [
        ['HEAT_SINK', 'HEAT_SINK', 'HEAT_SINK', 'HEAT_SINK'],
        ['HEAT_SINK']
      ],
      rightTorso: [
        ['HEAT_SINK', 'HEAT_SINK', 'HEAT_SINK', 'HEAT_SINK'],
        ['JUMP_JET', 'Medium Laser']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO'],
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK', 'JUMP_JET'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK', 'JUMP_JET']
    },

    heat: {
      heatSinks: 22,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'as7-a',
    name: 'Atlas',
    variant: 'AS7-A',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 278
    },
    tonnage: 100,
    bv: 1787,
    role: 'Juggernaut',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [3, 5, 0],
    armor: [9, 47, 17, 32, 10, 32, 10, 34, 34, 41, 41],
    structure: [3, 31, 15, 15, 12, 12, 15, 15],

    weapons: [
      {
        name: 'SRM 6',
        location: 'CT',
        heat: 4,
        damage: '2/Msl',
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'LRM 20',
        location: 'CT',
        heat: 6,
        damage: '1/Msl',
        minRange: 6,
        shortRange: 7,
        mediumRange: 14,
        longRange: 21
      },
      {
        name: 'AC/5',
        location: 'LT',
        heat: 1,
        damage: 5,
        minRange: 0,
        shortRange: 6,
        mediumRange: 12,
        longRange: 18
      },
      {
        name: 'Medium Laser',
        location: 'RA',
        heat: 3,
        damage: 5,
        minRange: 0,
        shortRange: 3,
        mediumRange: 6,
        longRange: 9
      },
      {
        name: 'AC/5',
        location: 'RA',
        heat: 1,
        damage: 5,
        minRange: 0,
        shortRange: 6,
        mediumRange: 12,
        longRange: 18
      }
    ],

    ammo: [
      { type: 'AC/5', rounds: 20, location: 'RT' },
      { type: 'LRM 20', rounds: 12, location: 'LT' },
      { type: 'SRM 6', rounds: 30, location: 'RT' }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', 'SENSORS', 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Medium Laser']
      ],
      leftTorso: [
        ['AC/5', 'AC/5', 'AC/5', 'AC/5'],
        ['LRM 10', 'LRM 10']
      ],
      rightTorso: [
        ['SRM 6', 'SRM 6', 'SRM 6', 'SRM 6'],
        ['SRM 6', 'SRM 6']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO'],
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE', 'GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'Ammo (SRM 6) 15', 'Ammo (SRM 6) 15'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 20,
      heatSinkType: 'Single'
    }
  }
];

export default mechs;
