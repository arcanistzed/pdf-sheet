 // PDF: https://www.montecookgames.com/store/product/cypher-system-character-and-campaign-sheets/
 // 20210830 - Targeted PDF in the download zip file: "Cypher System Character Sheets-Revised-FormFillable-2019-09-10.pdf"
 // Mapped by Fashtas
 
 [ 
	{ "pdf": "Name","foundry": @name},  
    { "pdf": "Descriptor", "foundry": @data.basic.descriptor },
    { "pdf": "Type", "foundry": @data.basic.type },
    { "pdf": "Focus", "foundry": @data.basic.focus },
    { "pdf": "Type_Focus_or_Other", "foundry": @data.basic.additionalSentence },	
    { "pdf": "Tier", "foundry": @data.basic.tier },
    { "pdf": "Effort", "foundry": @data.basic.effort },
    { "pdf": "Cyphers_Limit", "foundry": @data.basic.cypherLimit },
    { "pdf": "XP", "foundry": @data.basic.xp },
	
    { "pdf": "Might", "foundry": @data.pools.might.max },
    { "pdf": "Speed", "foundry": @data.pools.speed.max },
    { "pdf": "Intellect", "foundry": @data.pools.intellect.max },
    { "pdf": "Might_Pool", "foundry": @data.pools.might.value },
    { "pdf": "Might_Edge", "foundry": @data.pools.mightEdge },
    { "pdf": "Speed_Pool", "foundry": @data.pools.speed.value },
    { "pdf": "Speed_Edge", "foundry": @data.pools.speedEdge },
    { "pdf": "Intellect_Pool", "foundry": @data.pools.intellect.value },
    { "pdf": "Intellect_Edge", "foundry": @data.pools.intellectEdge },
	
    { "pdf": "Recovery_Roll", "foundry": @data.recoveries.recoveryRoll.replaceAll('1d6', '').trim().replaceAll('+', '') },
    { "pdf": "1_ACTION", "foundry": @data.recoveries.oneAction },
    { "pdf": "10_Min", "foundry": @data.recoveries.tenMinutes },
    { "pdf": "1_Hour", "foundry": @data.recoveries.oneHour },
    { "pdf": "10_Hours", "foundry": @data.recoveries.tenHours },
	
	{ "pdf": "Impaired", "foundry": @data.damage.damageTrack === 'Impaired'  ?? ''},
	{ "pdf": "Debilitated", "foundry": @data.damage.damageTrack === 'Debilitated'  ?? ''},

	{ "pdf": "Increase_Capabilities", "foundry": @data.advancement?.advStats ?? ''},
	{ "pdf": "Move_Toward_Perfection", "foundry": @data.advancement?.advEdge   ?? ''},
	{ "pdf": "Extra_Effort", "foundry": @data.advancement?.advEffort   ?? ''},
	{ "pdf": "Skill_Training", "foundry": @data.advancement?.advSkill   ?? ''},
	{ "pdf": "Other", "foundry": @data.advancement?.advOther  ?? ''},
	
    { "pdf": "Armor", "foundry": @data.armor.armorValueTotal },	
		
	{ "pdf": "Notes","foundry": @data.basic.notes?.replaceAll("</p>", "\n").replaceAll(/<br \/>/g, "\n").replaceAll(/<[^>]*>/g, "").trim() ?? ''},
	
	{ "pdf": "Background","foundry": @data.basic.description?.replaceAll("</p>", "\n").replaceAll(/<br \/>/g, "\n").replaceAll(/<[^>]*>/g, "").trim() ?? ''},
		
	{
        "pdf": "Cyphers",
		"foundry": @items.filter(item => item.type === "cypher").map(item => `${item.name}`).join("\n") ?? ''
    },
	
	{
        "pdf": "Special_Abilities",
		"foundry": @items.filter(item => item.type === "ability").map(item => `${item.name}`).join("\n") ?? ''
    },
	
	{
        "pdf": "Equipment",
		"foundry": @items.filter(item => item.type === "equipment").map(item => `${item.name}`).join("\n") ?? ''
    },

	{ "pdf": "Skills_1", "foundry": @items.filter(item => item.type === "skill")[0]?.name ?? ''},
	{ "pdf": "Skills_2", "foundry": @items.filter(item => item.type === "skill")[1]?.name ?? ''},
	{ "pdf": "Skills_3", "foundry": @items.filter(item => item.type === "skill")[2]?.name ?? ''},
	{ "pdf": "Skills_4", "foundry": @items.filter(item => item.type === "skill")[3]?.name ?? ''},
	{ "pdf": "Skills_5", "foundry": @items.filter(item => item.type === "skill")[4]?.name ?? ''},
	{ "pdf": "Skills_6", "foundry": @items.filter(item => item.type === "skill")[5]?.name ?? ''},
	{ "pdf": "Skills_7", "foundry": @items.filter(item => item.type === "skill")[6]?.name ?? ''},
	{ "pdf": "Skills_8", "foundry": @items.filter(item => item.type === "skill")[7]?.name ?? ''},
	{ "pdf": "Skills_9", "foundry": @items.filter(item => item.type === "skill")[8]?.name ?? ''},
	{ "pdf": "Skills_10", "foundry": @items.filter(item => item.type === "skill")[9]?.name ?? ''},
	{ "pdf": "Skills_11", "foundry": @items.filter(item => item.type === "skill")[10]?.name ?? ''},
	{ "pdf": "Skills_12", "foundry": @items.filter(item => item.type === "skill")[11]?.name ?? ''},
	{ "pdf": "Skills_13", "foundry": @items.filter(item => item.type === "skill")[12]?.name ?? ''},
	{ "pdf": "Skills_14", "foundry": @items.filter(item => item.type === "skill")[13]?.name ?? ''},
	
	{ "pdf": "Skills_P_1", "foundry": @items.filter(item => item.type === "skill")[0]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_2", "foundry": @items.filter(item => item.type === "skill")[1]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_3", "foundry": @items.filter(item => item.type === "skill")[2]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_4", "foundry": @items.filter(item => item.type === "skill")[3]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_5", "foundry": @items.filter(item => item.type === "skill")[4]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_6", "foundry": @items.filter(item => item.type === "skill")[5]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_7", "foundry": @items.filter(item => item.type === "skill")[6]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_8", "foundry": @items.filter(item => item.type === "skill")[7]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_9", "foundry": @items.filter(item => item.type === "skill")[8]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_10", "foundry": @items.filter(item => item.type === "skill")[9]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_11", "foundry": @items.filter(item => item.type === "skill")[10]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_12", "foundry": @items.filter(item => item.type === "skill")[11]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_13", "foundry": @items.filter(item => item.type === "skill")[12]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },
    { "pdf": "Skills_P_14", "foundry": @items.filter(item => item.type === "skill")[13]?.data?.data?.rollButton?.pool?.substring(0, 1) ?? '' },

	{ "pdf": "Skills_T_1", "foundry": @items.filter(item => item.type === "skill")[0]?.data?.data?.skillLevel === 'Trained' ?? '' },
	{ "pdf": "Skills_S_1", "foundry": @items.filter(item => item.type === "skill")[0]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_1", "foundry": @items.filter(item => item.type === "skill")[0]?.data?.data?.skillLevel === 'Inability' ?? ''},
	
	{ "pdf": "Skills_T_2", "foundry": @items.filter(item => item.type === "skill")[1]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_2", "foundry": @items.filter(item => item.type === "skill")[1]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_2", "foundry": @items.filter(item => item.type === "skill")[1]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_3", "foundry": @items.filter(item => item.type === "skill")[2]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_3", "foundry": @items.filter(item => item.type === "skill")[2]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_3", "foundry": @items.filter(item => item.type === "skill")[2]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_4", "foundry": @items.filter(item => item.type === "skill")[3]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_4", "foundry": @items.filter(item => item.type === "skill")[3]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_4", "foundry": @items.filter(item => item.type === "skill")[3]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_5", "foundry": @items.filter(item => item.type === "skill")[4]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_5", "foundry": @items.filter(item => item.type === "skill")[4]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_5", "foundry": @items.filter(item => item.type === "skill")[4]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_6", "foundry": @items.filter(item => item.type === "skill")[5]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_6", "foundry": @items.filter(item => item.type === "skill")[5]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_6", "foundry": @items.filter(item => item.type === "skill")[5]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_7", "foundry": @items.filter(item => item.type === "skill")[6]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_7", "foundry": @items.filter(item => item.type === "skill")[6]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_7", "foundry": @items.filter(item => item.type === "skill")[6]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_8", "foundry": @items.filter(item => item.type === "skill")[7]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_8", "foundry": @items.filter(item => item.type === "skill")[7]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_8", "foundry": @items.filter(item => item.type === "skill")[7]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_9", "foundry": @items.filter(item => item.type === "skill")[8]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_9", "foundry": @items.filter(item => item.type === "skill")[8]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_9", "foundry": @items.filter(item => item.type === "skill")[8]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_10", "foundry": @items.filter(item => item.type === "skill")[9]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_10", "foundry": @items.filter(item => item.type === "skill")[9]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_10", "foundry": @items.filter(item => item.type === "skill")[9]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_11", "foundry": @items.filter(item => item.type === "skill")[10]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_11", "foundry": @items.filter(item => item.type === "skill")[10]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_11", "foundry": @items.filter(item => item.type === "skill")[10]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_12", "foundry": @items.filter(item => item.type === "skill")[11]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_12", "foundry": @items.filter(item => item.type === "skill")[11]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_12", "foundry": @items.filter(item => item.type === "skill")[11]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_13", "foundry": @items.filter(item => item.type === "skill")[12]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_13", "foundry": @items.filter(item => item.type === "skill")[12]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_13", "foundry": @items.filter(item => item.type === "skill")[12]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Skills_T_14", "foundry": @items.filter(item => item.type === "skill")[13]?.data?.data?.skillLevel === 'Trained'  ?? ''},
	{ "pdf": "Skills_S_14", "foundry": @items.filter(item => item.type === "skill")[13]?.data?.data?.skillLevel === 'Specialized' ?? ''},
	{ "pdf": "Skills_I_14", "foundry": @items.filter(item => item.type === "skill")[13]?.data?.data?.skillLevel === 'Inability' ?? ''},

	{ "pdf": "Attacks_1", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[0]?.name ?? ''},
	{ "pdf": "Attacks_2", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[1]?.name ?? ''},
	{ "pdf": "Attacks_3", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[2]?.name ?? ''},
	{ "pdf": "Attacks_4", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[3]?.name ?? ''},
	{ "pdf": "Attacks_5", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[4]?.name ?? ''},
	{ "pdf": "Attacks_6", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[5]?.name ?? ''},
	{ "pdf": "Attacks_7", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[6]?.name ?? ''},

	{ "pdf": "Attacks_Mod_1", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[0]?.data?.data?.attackType?.substring(0, 1).toUpperCase() ?? ''},
	{ "pdf": "Attacks_Dam_1", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[0]?.data?.data?.damage ?? ''},

	{ "pdf": "Attacks_Mod_2", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[1]?.data?.data?.attackType?.substring(0, 1).toUpperCase() ?? ''},
	{ "pdf": "Attacks_Dam_2", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[1]?.data?.data?.damage ?? ''},

	{ "pdf": "Attacks_Mod_3", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[2]?.data?.data?.attackType?.substring(0, 1).toUpperCase() ?? ''},
	{ "pdf": "Attacks_Dam_3", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[2]?.data?.data?.damage ?? ''},

	{ "pdf": "Attacks_Mod_4", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[3]?.data?.data?.attackType?.substring(0, 1).toUpperCase() ?? ''},
	{ "pdf": "Attacks_Dam_4", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[3]?.data?.data?.damage ?? ''},

	{ "pdf": "Attacks_Mod_5", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[4]?.data?.data?.attackType?.substring(0, 1).toUpperCase() ?? ''},
	{ "pdf": "Attacks_Dam_5", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[4]?.data?.data?.damage ?? ''},

	{ "pdf": "Attacks_Mod_6", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[5]?.data?.data?.attackType?.substring(0, 1).toUpperCase() ?? ''},
	{ "pdf": "Attacks_Dam_6", "foundry": @items.filter(item => item.type === "attack")[5]?.data?.data?.damage ?? ''},

	{ "pdf": "Attacks_Mod_7", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[6]?.data?.data?.attackType?.substring(0, 1).toUpperCase() ?? ''},
	{ "pdf": "Attacks_Dam_7", "foundry": @items.filter(item => item.type === "attack" || item.type === "armor")[6]?.data?.data?.damage ?? ''},		
]