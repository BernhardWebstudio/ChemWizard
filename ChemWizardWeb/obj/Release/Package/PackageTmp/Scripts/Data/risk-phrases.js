var risk_phrases = {

"R1": "Explosive when dry",
"R2": "Risk of explosion by shock, friction, fire or other sources of ignition",
"R3": "Extreme risk of explosion by shock, friction, fire or other sources of ignition",
"R4": "Forms very sensitive explosive metallic compounds",
"R5": "Heating may cause an explosion",
"R6": "Explosive with or without contact with air",
"R7": "May cause fire",
"R8": "Contact with combustible material may cause fire",
"R9": "Explosive when mixed with combustible material",
"R10": "Flammable",
"R11": "Highly flammable",
"R12": "Extremely flammable",
"R14": "Reacts violently with water",
"R15": "Contact with water liberates extremely flammable gases",
"R16": "Explosive when mixed with oxidising substances",
"R17": "Spontaneously flammable in air",
"R18": "In use, may form flammable/explosive vapour-air mixture",
"R19": "May form explosive peroxides",
"R20": "Harmful by inhalation",
"R21": "Harmful in contact with skin",
"R22": "Harmful if swallowed",
"R23": "Toxic by inhalation",
"R24": "Toxic in contact with skin",
"R25": "Toxic if swallowed",
"R26": "Very toxic by inhalation",
"R27": "Very toxic in contact with skin",
"R28": "Very toxic if swallowed",
"R29": "Contact with water liberates toxic gas.",
"R30": "Can become highly flammable in use",
"R31": "Contact with acids liberates toxic gas",
"R32": "Contact with acids liberates very toxic gas",
"R33": "Danger of cumulative effects",
"R34": "Causes burns",
"R35": "Causes severe burns",
"R36": "Irritating to eyes",
"R37": "Irritating to respiratory system",
"R38": "Irritating to skin",
"R39": "Danger of very serious irreversible effects",
"R40": "Limited evidence of a carcinogenic effect",
"R41": "Risk of serious damage to eyes",
"R42": "May cause sensitisation by inhalation",
"R43": "May cause sensitisation by skin contact",
"R44": "Risk of explosion if heated under confinement",
"R45": "May cause cancer",
"R46": "May cause inheritable genetic damage",
"R48": "Danger of serious damage to health by prolonged exposure",
"R49": "May cause cancer by inhalation",
"R50": "Very toxic to aquatic organisms",
"R51": "Toxic to aquatic organisms",
"R52": "Harmful to aquatic organisms",
"R53": "May cause long-term adverse effects in the aquatic environment",
"R54": "Toxic to flora",
"R55": "Toxic to fauna",
"R56": "Toxic to soil organisms",
"R57": "Toxic to bees",
"R58": "May cause long-term adverse effects in the environment",
"R59": "Dangerous for the ozone layer",
"R60": "May impair fertility",
"R61": "May cause harm to the unborn child",
"R62": "Possible risk of impaired fertility",
"R63": "Possible risk of harm to the unborn child",
"R64": "May cause harm to breast-fed babies",
"R65": "Harmful: may cause lung damage if swallowed",
"R66": "Repeated exposure may cause skin dryness or cracking",
"R67": "Vapours may cause drowsiness and dizziness",
"R68": "Possible risk of irreversible effects",

"R14/15": "Reacts violently with water, liberating extremely flammable gases",
"R15/29": "Contact with water liberates toxic, extremely flammable gases",
"R14/15/29": "Reacts violently with water, liberating toxic, extremely flammable gases",
"R20/21": "Harmful by inhalation and in contact with skin",
"R20/22": "Harmful by inhalation and if swallowed",
"R20/21/22": "Harmful by inhalation, in contact with skin and if swallowed",
"R21/22": "Harmful in contact with skin and if swallowed",
"R23/24": "Toxic by inhalation and in contact with skin",
"R23/25": "Toxic by inhalation and if swallowed",
"R23/24/25": "Toxic by inhalation, in contact with skin and if swallowed",
"R24/25": "Toxic in contact with skin and if swallowed",
"R26/27": "Very toxic by inhalation and in contact with skin",
"R26/28": "Very toxic by inhalation and if swallowed",
"R26/27/28": "Very toxic by inhalation, in contact with skin and if swallowed",
"R27/28": "Very toxic in contact with skin and if swallowed",
"R36/37": "Irritating to eyes and respiratory system",
"R36/38": "Irritating to eyes and skin",
"R36/37/38": "Irritating to eyes, respiratory system and skin",
"R37/38": "Irritating to respiratory system and skin",
"R39/23": "Toxic: danger of very serious irreversible effects through inhalation",
"R39/24": "Toxic: danger of very serious irreversible effects in contact with skin",
"R39/25": "Toxic: danger of very serious irreversible effects if swallowed",
"R39/23/24": "Toxic: danger of very serious irreversible effects through inhalation and in contact with skin",
"R39/23/25": "Toxic: danger of very serious irreversible effects through inhalation and if swallowed",
"R39/24/25": "Toxic: danger of very serious irreversible effects in contact with skin and if swallowed",
"R39/23/24/25": "Toxic: danger of very serious irreversible effects through inhalation, in contact with skin and if swallowed",
"R39/26": "Very Toxic: danger of very serious irreversible effects through inhalation",
"R39/27": "Very Toxic: danger of very serious irreversible effects in contact with skin",
"R39/28": "Very Toxic: danger of very serious irreversible effects if swallowed",
"R39/26/27": "Very Toxic: danger of very serious irreversible effects through inhalation and in contact with skin",
"R39/26/28": "Very Toxic: danger of very serious irreversible effects through inhalation and if swallowed",
"R39/27/28": "Very Toxic: danger of very serious irreversible effects in contact with skin and if swallowed",
"R39/26/27/28": "Very Toxic: danger of very serious irreversible effects through inhalation, in contact with skin and if swallowed",
"R42/43": "May cause sensitization by inhalation and skin contact",
"R45/46": "May cause cancer and heritable genetic damage",
"R48/20": "Harmful: danger of serious damage to health by prolonged exposure through inhalation",
"R48/21": "Harmful: danger of serious damage to health by prolonged exposure in contact with skin",
"R48/22": "Harmful: danger of serious damage to health by prolonged exposure if swallowed",
"R48/20/21": "Harmful: danger of serious damage to health by prolonged exposure through inhalation and in contact with skin",
"R48/20/22": "Harmful: danger of serious damage to health by prolonged exposure through inhalation and if swallowed",
"R48/21/22": "Harmful: danger of serious damage to health by prolonged exposure in contact with skin and if swallowed",
"R48/20/21/22": "Harmful: danger of serious damage to health by prolonged exposure through inhalation, in contact with skin and if swallowed",
"R48/23": "Toxic: danger of serious damage to health by prolonged exposure through inhalation",
"R48/24": "Toxic: danger of serious damage to health by prolonged exposure in contact with skin",
"R48/25": "Toxic: danger of serious damage to health by prolonged exposure if swallowed",
"R48/23/24": "Toxic: danger of serious damage to health by prolonged exposure through inhalation and in contact with skin",
"R48/23/25": "Toxic: danger of serious damage to health by prolonged exposure through inhalation and if swallowed",
"R48/24/25": "Toxic: danger of serious damage to health by prolonged exposure in contact with skin and if swallowed",
"R48/23/24/25": "Toxic: danger of serious damage to health by prolonged exposure through inhalation, in contact with skin and if swallowed",
"R50/53": "Very toxic to aquatic organisms, may cause long-term adverse effects in the aquatic environment",
"R51/53": "Toxic to aquatic organisms, may cause long-term adverse effects in the aquatic environment",
"R52/53": "Harmful to aquatic organisms, may cause long-term adverse effects in the aquatic environment",
"R68/20": "Harmful: possible risk of irreversible effects through inhalation",
"R68/21": "Harmful: possible risk of irreversible effects in contact with skin",
"R68/22": "Harmful: possible risk of irreversible effects if swallowed",
"R68/20/21": "Harmful: possible risk of irreversible effects through inhalation and in contact with skin",
"R68/20/22": "Harmful: possible risk of irreversible effects through inhalation and if swallowed",
"R68/21/22": "Harmful: possible risk of irreversible effects in contact with skin and if swallowed",
"R68/20/21/22": "Harmful: possible risk of irreversible effects through inhalation, in contact with skin and if swallowed",

"R13": "Extremely flammable liquefied gas.",
"R47": "May cause birth defects."

}