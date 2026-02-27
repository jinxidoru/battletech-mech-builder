/**
 * BattleTech Mech Database
 * Base BV assumes Gunnery 4/Piloting 5 skills
 *
 * movement: [walk, run, jump]
 * armor: [head, CT, CTr, LT, LTr, RT, RTr, LA, RA, LL, RL]
 * structure: [head, CT, LT, RT, LA, RA, LL, RL] (no rear locations)
 *
 * weapons: Array format [qty, location, weaponRef]
 *   - qty: number of this weapon
 *   - location: where weapon is mounted (RA, LA, RT, LT, CT, LL, RL)
 *   - weaponRef: reference to weapon library defined below
 *
 * criticals: head/legs are single arrays, arms/torsos are nested arrays [column1-3, column4-6]
 *            trailing nulls should be removed, but internal nulls are preserved
 *            IMPORTANT: columns 1-3 and 4-6 are completely separate and often different
 *
 * Damage Types:
 *   'DE' = Direct Energy (lasers)
 *   'M'  = Missiles (SRM, LRM)
 *   'B'  = Ballistic (AC, Machine Guns)
 *   'P'  = Physical (Flamers, etc.)
 */

// Standard Weapons Library
const weapons = {
  small_laser: { name: 'Small Laser', heat: 1, damage: 3, damageType: 'DE', range: [0, 1, 2, 3] },
  medium_laser: { name: 'Medium Laser', heat: 3, damage: 5, damageType: 'DE', range: [0, 3, 6, 9] },
  large_laser: { name: 'Large Laser', heat: 8, damage: 8, damageType: 'DE', range: [0, 5, 10, 15] },
  medium_pulse_laser: { name: 'Medium Pulse Laser', heat: 4, damage: 6, damageType: 'DE', range: [0, 2, 4, 6] },
  machine_gun: { name: 'Machine Gun', heat: 0, damage: 2, damageType: 'DB,AI', range: [0, 1, 2, 3] },
  flamer: { name: 'Flamer', heat: 3, damage: 2, damageType: 'P', range: [0, 1, 2, 3] },
  srm2: { name: 'SRM 2', heat: 2, damage: 2, damageType: 'M', range: [0, 3, 6, 9] },
  srm4: { name: 'SRM 4', heat: 3, damage: 2, damageType: 'M', range: [0, 3, 6, 9] },
  srm6: { name: 'SRM 6', heat: 4, damage: 2, damageType: 'M', range: [0, 3, 6, 9] },
  lrm10: { name: 'LRM 10', heat: 4, damage: 1, damageType: 'M', range: [6, 7, 14, 21] },
  lrm15: { name: 'LRM 15', heat: 5, damage: 1, damageType: 'M', range: [6, 7, 14, 21] },
  lrm20: { name: 'LRM 20', heat: 6, damage: 1, damageType: 'M', range: [6, 7, 14, 21] },
  ppc: { name: 'PPC', heat: 10, damage: 10, damageType: 'DE', range: [3, 6, 12, 18] },
  ac2: { name: 'AC/2', heat: 1, damage: 2, damageType: 'B', range: [0, 8, 16, 24] },
  ac5: { name: 'AC/5', heat: 1, damage: 5, damageType: 'B', range: [0, 6, 12, 18] },
  ac10: { name: 'AC/10', heat: 3, damage: 10, damageType: 'B', range: [0, 5, 10, 15] }
};

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
    structure: [3, 6, 5, 5, 3, 3, 4, 4],

    weapons: [
      [1, 'RA', weapons.medium_laser],
      [1, 'RA', weapons.small_laser],
      [1, 'LA', weapons.small_laser],
      [1, 'LA', weapons.medium_laser]
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'Medium Laser', 'Small Laser'],
        []
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'Medium Laser', 'Small Laser'],
        []
      ],
      leftTorso: [[], []],
      rightTorso: [[], []],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
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
    id: 'lct-1v',
    name: 'Locust',
    variant: 'LCT-1V',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 13
    },
    tonnage: 20,
    bv: 432,
    role: 'Scout',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [8, 12, 0],
    armor: [8, 10, 2, 8, 2, 8, 2, 4, 4, 8, 8],
    structure: [3, 6, 5, 5, 3, 3, 4, 4],

    weapons: [
      [1, 'CT', weapons.medium_laser],
      [1, 'RA', weapons.machine_gun],
      [1, 'LA', weapons.machine_gun]
    ],

    ammo: [
      { type: 'Machine Gun', rounds: 200 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'Machine Gun'],
        []
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'Machine Gun'],
        []
      ],
      leftTorso: [[], []],
      rightTorso: [[], []],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
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
      page: 50
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
      [2, 'RT', weapons.machine_gun],
      [1, 'RA', weapons.medium_laser],
      [1, 'RA', weapons.small_laser],
      [1, 'LA', weapons.small_laser],
      [1, 'LA', weapons.medium_laser]
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
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
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
      page: 100
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
      [1, 'RT', weapons.medium_laser],
      [1, 'LT', weapons.medium_laser],
      [2, 'RA', weapons.flamer],
      [2, 'LA', weapons.flamer],
      [1, 'LA', weapons.medium_laser]
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
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
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
      page: 200
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
      [1, 'RT', weapons.srm6],
      [1, 'RT', weapons.medium_laser],
      [1, 'LT', weapons.medium_laser],
      [1, 'RA', weapons.medium_laser],
      [1, 'RA', weapons.ppc]
    ],

    ammo: [
      { type: 'SRM 6', rounds: 15 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Large Laser'],
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Endo Steel']
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
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
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
    structure: [3, 31, 21, 21, 12, 12, 15, 15],

    weapons: [
      [1, 'CT', weapons.srm6],
      [1, 'CT', weapons.lrm20],
      [1, 'LT', weapons.ac5],
      [1, 'RT', weapons.ac5],
      [1, 'RA', weapons.medium_laser],
      [1, 'LA', weapons.medium_laser]
    ],

    ammo: [
      { type: 'AC/5', rounds: 20, location: 'RT' },
      { type: 'LRM 20', rounds: 12, location: 'LT' },
      { type: 'SRM 6', rounds: 60, location: 'LL/RT' }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', 'SENSORS', 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator', 'Medium Laser', 'HEAT_SINK'],
        []
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator', 'Medium Laser', 'HEAT_SINK'],
        []
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
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'Ammo (SRM 6) 15', 'Ammo (SRM 6) 15'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 20,
      heatSinkType: 'Single'
    }
  },

  // LIGHT MECHS (20-35 tons)

  {
    id: 'wsp-1a',
    name: 'Wasp',
    variant: 'WSP-1A',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 73
    },
    tonnage: 20,
    bv: 336,
    role: 'Scout',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [6, 9, 6],
    armor: [8, 6, 2, 4, 2, 4, 2, 3, 3, 6, 6],
    structure: [3, 6, 5, 5, 3, 3, 4, 4],

    weapons: [
      [1, 'RA', weapons.medium_laser]
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        []
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Medium Laser']
      ],
      leftTorso: [
        [],
        []
      ],
      rightTorso: [
        [],
        []
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET', 'JUMP_JET'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET', 'JUMP_JET']
    },

    heat: {
      heatSinks: 10,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'com-1c',
    name: 'Commando',
    variant: 'COM-1C',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 18
    },
    tonnage: 25,
    bv: 458,
    role: 'Striker',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [6, 9, 0],
    armor: [8, 8, 4, 6, 4, 6, 4, 4, 4, 6, 6],
    structure: [3, 8, 6, 6, 4, 4, 6, 6],

    weapons: [
      [1, 'RA', weapons.ac2],
      [1, 'LA', weapons.medium_laser]
    ],

    ammo: [
      { type: 'AC/2', rounds: 45 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Medium Laser']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['AC/2']
      ],
      leftTorso: [
        ['HEAT_SINK'],
        []
      ],
      rightTorso: [
        ['HEAT_SINK'],
        ['Ammo (AC/2) 45']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR']
    },

    heat: {
      heatSinks: 10,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'sdr-5d',
    name: 'Spider',
    variant: 'SDR-5D',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 41
    },
    tonnage: 30,
    bv: 524,
    role: 'Scout',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [8, 12, 8],
    armor: [8, 8, 2, 7, 2, 7, 2, 5, 5, 7, 7],
    structure: [3, 10, 7, 7, 5, 5, 7, 7],

    weapons: [
      [1, 'CT', weapons.medium_laser],
      [1, 'RA', weapons.flamer]
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        []
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Flamer']
      ],
      leftTorso: [
        ['JUMP_JET'],
        ['JUMP_JET']
      ],
      rightTorso: [
        ['JUMP_JET'],
        ['JUMP_JET']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET', 'JUMP_JET'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET', 'JUMP_JET']
    },

    heat: {
      heatSinks: 10,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'jnr-7a',
    name: 'Jenner',
    variant: 'JNR-7A',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 51
    },
    tonnage: 35,
    bv: 712,
    role: 'Striker',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [7, 11, 5],
    armor: [8, 10, 4, 8, 4, 8, 4, 4, 4, 8, 8],
    structure: [3, 11, 8, 8, 5, 5, 8, 8],

    weapons: [
      [1, 'RT', weapons.large_laser]
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        [],
        []
      ],
      rightArm: [
        [],
        []
      ],
      leftTorso: [
        ['JUMP_JET'],
        ['JUMP_JET']
      ],
      rightTorso: [
        ['JUMP_JET'],
        ['Large Laser']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 12,
      heatSinkType: 'Single'
    }
  },

  // MEDIUM MECHS (40-55 tons)

  {
    id: 'hct-3f',
    name: 'Hatchetman',
    variant: 'HCT-3F',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 102
    },
    tonnage: 45,
    bv: 854,
    role: 'Brawler',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [4, 6, 4],
    armor: [9, 14, 4, 11, 4, 11, 4, 11, 11, 11, 11],
    structure: [3, 14, 11, 11, 7, 7, 11, 11],

    weapons: [
      [1, 'RT', weapons.ac10],
      [1, 'RA', weapons.medium_laser],
      [1, 'LA', weapons.medium_laser]
    ],

    ammo: [
      { type: 'AC/10', rounds: 20 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Medium Laser']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Hatchet']
      ],
      leftTorso: [
        ['HEAT_SINK'],
        []
      ],
      rightTorso: [
        ['HEAT_SINK'],
        ['AC/10']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET']
    },

    heat: {
      heatSinks: 11,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'cn9-a',
    name: 'Centurion',
    variant: 'CN9-A',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 109
    },
    tonnage: 50,
    bv: 945,
    role: 'Brawler',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [4, 6, 0],
    armor: [9, 18, 6, 16, 6, 16, 6, 16, 16, 16, 16],
    structure: [3, 16, 12, 12, 8, 8, 12, 12],

    weapons: [
      [1, 'CT', weapons.medium_laser],
      [1, 'CT', weapons.medium_laser],
      [1, 'LT', weapons.lrm10],
      [1, 'RA', weapons.ac10]
    ],

    ammo: [
      { type: 'AC/10', rounds: 20 },
      { type: 'LRM 10', rounds: 24 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        []
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['AC/10']
      ],
      leftTorso: [
        ['HEAT_SINK'],
        ['LRM 10']
      ],
      rightTorso: [
        ['HEAT_SINK'],
        ['Ammo (AC/10) 10']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR']
    },

    heat: {
      heatSinks: 10,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'tbt-5j',
    name: 'Trebuchet',
    variant: 'TBT-5J',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 130
    },
    tonnage: 50,
    bv: 1191,
    role: 'Skirmisher',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [5, 8, 5],
    armor: [9, 16, 5, 12, 5, 12, 5, 10, 10, 12, 12],
    structure: [3, 16, 12, 12, 8, 8, 12, 12],

    weapons: [
      [1, 'RT', weapons.lrm15],
      [2, 'RA', weapons.medium_laser],
      [1, 'LA', weapons.medium_laser]
    ],

    ammo: [
      { type: 'LRM 15', rounds: 8 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Medium Laser']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Medium Laser']
      ],
      leftTorso: [
        ['HEAT_SINK'],
        []
      ],
      rightTorso: [
        ['LRM 15'],
        ['LRM 15']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'JUMP_JET']
    },

    heat: {
      heatSinks: 15,
      heatSinkType: 'Single'
    }
  },

  // HEAVY MECHS (60-75 tons)

  {
    id: 'drgn-1c',
    name: 'Dragon',
    variant: 'DRG-1C',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 157
    },
    tonnage: 60,
    bv: 1215,
    role: 'Skirmisher',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [5, 8, 0],
    armor: [9, 28, 10, 20, 10, 20, 10, 20, 20, 20, 20],
    structure: [3, 20, 14, 14, 10, 10, 14, 14],

    weapons: [
      [1, 'CT', weapons.lrm10],
      [1, 'LT', weapons.medium_laser],
      [1, 'RA', weapons.ac2],
      [1, 'LA', weapons.medium_laser]
    ],

    ammo: [
      { type: 'AC/2', rounds: 45 },
      { type: 'LRM 10', rounds: 24 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR'],
        ['Medium Laser']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR'],
        ['AC/2']
      ],
      leftTorso: [
        ['Medium Laser (R)'],
        ['Ammo (LRM 10) 12']
      ],
      rightTorso: [
        ['Ammo (AC/2) 45'],
        []
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR']
    },

    heat: {
      heatSinks: 10,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'cplt-a1',
    name: 'Catapult',
    variant: 'CPLT-A1',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 172
    },
    tonnage: 65,
    bv: 1285,
    role: 'Missile Boat',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [4, 6, 4],
    armor: [9, 20, 8, 15, 8, 15, 8, 20, 20, 15, 15],
    structure: [3, 21, 15, 15, 10, 10, 15, 15],

    weapons: [
      [1, 'RA', weapons.lrm15],
      [1, 'LA', weapons.lrm15]
    ],

    ammo: [
      { type: 'LRM 15', rounds: 32 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR'],
        ['LRM 15']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR'],
        ['LRM 15']
      ],
      leftTorso: [
        ['JUMP_JET'],
        ['Ammo (LRM 15) 8']
      ],
      rightTorso: [
        ['JUMP_JET'],
        ['Ammo (LRM 15) 8']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 15,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'whm-6r',
    name: 'Warhammer',
    variant: 'WHM-6R',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 225
    },
    tonnage: 70,
    bv: 1299,
    role: 'Brawler',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [4, 6, 0],
    armor: [9, 27, 10, 22, 8, 22, 8, 24, 24, 24, 24],
    structure: [3, 22, 15, 15, 11, 11, 15, 15],

    weapons: [
      [2, 'RT', weapons.medium_pulse_laser],
      [1, 'LT', weapons.medium_pulse_laser],
      [1, 'RA', weapons.ppc],
      [1, 'LA', weapons.ppc]
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR'],
        ['PPC']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR'],
        ['PPC']
      ],
      leftTorso: [
        ['Medium Pulse Laser'],
        ['Endo Steel']
      ],
      rightTorso: [
        ['Medium Pulse Laser'],
        ['Endo Steel']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 19,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'mad-3r',
    name: 'Marauder',
    variant: 'MAD-3R',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 238
    },
    tonnage: 75,
    bv: 1329,
    role: 'Sniper',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [4, 6, 0],
    armor: [9, 30, 10, 26, 8, 26, 8, 30, 30, 26, 26],
    structure: [3, 23, 16, 16, 12, 12, 16, 16],

    weapons: [
      [1, 'CT', weapons.medium_laser],
      [1, 'RT', weapons.medium_laser],
      [1, 'LT', weapons.large_laser],
      [1, 'RA', weapons.lrm15],
      [1, 'LA', weapons.ac5]
    ],

    ammo: [
      { type: 'AC/5', rounds: 20 },
      { type: 'LRM 15', rounds: 8 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR'],
        ['AC/5']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR'],
        ['LRM 15']
      ],
      leftTorso: [
        ['Large Laser'],
        ['Medium Laser (R)']
      ],
      rightTorso: [
        ['Ammo (LRM 15) 8'],
        []
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 17,
      heatSinkType: 'Single'
    }
  },

  // ASSAULT MECHS (80-100 tons)

  {
    id: 'aws-8q',
    name: 'Awesome',
    variant: 'AWS-8Q',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 214
    },
    tonnage: 80,
    bv: 1605,
    role: 'Sniper',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [3, 5, 0],
    armor: [9, 36, 10, 26, 10, 26, 10, 26, 26, 33, 33],
    structure: [3, 25, 17, 17, 13, 13, 17, 17],

    weapons: [
      [1, 'HD', weapons.small_laser],
      [1, 'LT', weapons.ppc],
      [1, 'RT', weapons.ppc],
      [1, 'RA', weapons.ppc]
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        []
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['HEAT_SINK']
      ],
      leftTorso: [
        ['HEAT_SINK'],
        ['HEAT_SINK']
      ],
      rightTorso: [
        ['HEAT_SINK'],
        ['HEAT_SINK']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 28,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'stk-3f',
    name: 'Stalker',
    variant: 'STK-3F',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 250
    },
    tonnage: 85,
    bv: 1559,
    role: 'Juggernaut',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [3, 5, 0],
    armor: [9, 36, 7, 26, 7, 26, 7, 26, 26, 28, 28],
    structure: [3, 27, 18, 18, 14, 14, 18, 18],

    weapons: [
      [1, 'RT', weapons.large_laser],
      [1, 'LT', weapons.large_laser],
      [1, 'LT', weapons.srm6],
      [1, 'RT', weapons.medium_laser],
      [1, 'RA', weapons.lrm10],
      [1, 'RA', weapons.medium_laser],
      [1, 'LA', weapons.lrm10],
      [1, 'LA', weapons.medium_laser]
    ],

    ammo: [
      { type: 'LRM 10', rounds: 24 },
      { type: 'SRM 6', rounds: 30 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR'],
        ['LRM 10']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR'],
        ['LRM 10']
      ],
      leftTorso: [
        ['HEAT_SINK'],
        ['Large Laser']
      ],
      rightTorso: [
        ['HEAT_SINK'],
        ['Large Laser']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 20,
      heatSinkType: 'Single'
    }
  },

  {
    id: 'blr-1d',
    name: 'BattleMaster',
    variant: 'BLR-1D',
    source: {
      file: 'BattleTech_Record_Sheets_Succession_Wars.pdf',
      page: 241
    },
    tonnage: 85,
    bv: 1522,
    role: 'Brawler',
    techBase: 'Inner Sphere',
    rulesLevel: 'Introductory',
    movement: [4, 6, 0],
    armor: [9, 40, 8, 31, 8, 31, 8, 27, 27, 31, 31],
    structure: [3, 27, 18, 18, 14, 14, 18, 18],

    weapons: [
      [2, 'RT', weapons.medium_laser],
      [1, 'LT', weapons.medium_laser],
      [1, 'RA', weapons.ppc],
      [1, 'LA', weapons.machine_gun]
    ],

    ammo: [
      { type: 'Machine Gun', rounds: 200 }
    ],

    criticals: {
      head: ['LIFE_SUPPORT', 'SENSORS', 'COCKPIT', null, 'SENSORS', 'LIFE_SUPPORT'],
      leftArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['Machine Gun']
      ],
      rightArm: [
        ['SHOULDER', 'UPPER_ARM_ACTUATOR', 'LOWER_ARM_ACTUATOR', 'Hand Actuator'],
        ['PPC']
      ],
      leftTorso: [
        ['HEAT_SINK'],
        ['HEAT_SINK']
      ],
      rightTorso: [
        ['HEAT_SINK'],
        ['HEAT_SINK']
      ],
      centerTorso: [
        ['FUSION_ENGINE', 'FUSION_ENGINE', 'FUSION_ENGINE'],
        ['GYRO', 'GYRO', 'GYRO']
      ],
      leftLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK'],
      rightLeg: ['HIP', 'UPPER_LEG_ACTUATOR', 'LOWER_LEG_ACTUATOR', 'FOOT_ACTUATOR', 'HEAT_SINK']
    },

    heat: {
      heatSinks: 24,
      heatSinkType: 'Single'
    }
  }
];

export default mechs;
