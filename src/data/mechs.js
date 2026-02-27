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
  machine_gun: { name: 'Machine Gun', heat: 0, damage: 2, damageType: 'DB,AI', range: [0, 1, 2, 3] },
  flamer: { name: 'Flamer', heat: 3, damage: 2, damageType: 'P', range: [0, 1, 2, 3] },
  srm6: { name: 'SRM 6', heat: 4, damage: 2, damageType: 'M', range: [0, 3, 6, 9] },
  lrm20: { name: 'LRM 20', heat: 6, damage: 1, damageType: 'M', range: [6, 7, 14, 21] },
  ppc: { name: 'PPC', heat: 10, damage: 10, damageType: 'DE', range: [3, 6, 12, 18] },
  ac5: { name: 'AC/5', heat: 1, damage: 5, damageType: 'B', range: [0, 6, 12, 18] }
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
      page: 201
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
