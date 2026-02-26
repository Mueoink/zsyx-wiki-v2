// app/composables/useBeliefTest.js
import { reactive, toRefs } from "vue";

const SCORE_WEIGHTS = {
  MAIN_FACTION_FROM_SELF: 0.7,
  MAIN_FACTION_FROM_BRANCH_AVG: 0.5,
  MAIN_FACTION_PENALTY_FROM_OPPOSING: 0.35,
  SECONDARY_BRANCH_FROM_SELF: 0.85,
  SECONDARY_BRANCH_FROM_MAIN_FACTION: 0.3,
  SECONDARY_BRANCH_PENALTY_FROM_OPPOSING: 0.2,
  SECONDARY_CHOICE_COEFFICIENT: 1.4,
  CREDIBILITY_SCALING_FACTOR: 1.6,
};

const jobsData = {
  诞育: {
    战士: "酋长",
    法师: "生命贤者",
    牧师: "子嗣牧师",
    刺客: "借诞之婴",
    猎人: "创生猎人",
    歌者: "",
  },
  繁荣: {
    战士: "德鲁伊",
    法师: "木精灵",
    牧师: "园丁",
    刺客: "荆棘之冠",
    猎人: "美食家",
    歌者: "",
  },
  死亡: {
    战士: "",
    法师: "死灵法师",
    牧师: "守墓人",
    刺客: "死亡编织者",
    猎人: "猩红猎手",
    歌者: "撞钟人",
  },
  污堕: {
    战士: "尖啸伯爵",
    法师: "欲望主宰",
    牧师: "悲悯领主",
    刺客: "恶孽",
    猎人: "感官追猎者",
    歌者: "塞壬",
  },
  腐朽: {
    战士: "木乃伊",
    法师: "瘟疫枢机",
    牧师: "凋零祭司",
    刺客: "疮痍之目",
    猎人: "黄昏猎人",
    歌者: "腐烂颂唱者",
  },
  湮灭: {
    战士: "清道夫",
    法师: "烬灭者",
    牧师: "焚化工",
    刺客: "寂灭使徒",
    猎人: "终焉行者",
    歌者: "毁灭宣告",
  },
  秩序: {
    战士: "秩序骑士",
    法师: "元素法官",
    牧师: "公正官",
    刺客: "行刑官",
    猎人: "搜查官",
    歌者: "律者",
  },
  真理: {
    战士: "格斗专家",
    法师: "博识学者",
    牧师: "外科医生",
    刺客: "暗杀博士",
    猎人: "陷阱大师",
    歌者: "博闻诗人",
  },
  战争: {
    战士: "陷阵勇士",
    法师: "炼狱主教",
    牧师: "督战官",
    刺客: "隙光铁刺",
    猎人: "鹰眼斥候",
    歌者: "风暴之嗓",
  },
  混乱: {
    战士: "异血同袍",
    法师: "灾祸之源",
    牧师: "理智蚀者",
    刺客: "折光析影",
    猎人: "渔夫",
    歌者: "失律琴师",
  },
  痴愚: {
    战士: "竖壁骑士",
    法师: "幕后戏师",
    牧师: "怯愚专家",
    刺客: "解构之眼",
    猎人: "猎愚人",
    歌者: "独奏家",
  },
  沉默: {
    战士: "苦行僧",
    法师: "默剧大师",
    牧师: "守夜人",
    刺客: "偃偶师",
    猎人: "变色龙",
    歌者: "囚徒",
  },
  记忆: {
    战士: "镜中人",
    法师: "回忆旅者",
    牧师: "见证者",
    刺客: "旧日追猎者",
    猎人: "窥梦游侠",
    歌者: "史学家",
  },
  时间: {
    战士: "指针骑士",
    法师: "时间行者",
    牧师: "遗忘医生",
    刺客: "另日刺客",
    猎人: "驯风游侠",
    歌者: "吟游诗人",
  },
  欺诈: {
    战士: "杂技演员",
    法师: "诡术大师",
    牧师: "小丑",
    刺客: "受害者",
    猎人: "驯兽师",
    歌者: "魔术师",
  },
  命运: {
    战士: "今日勇士",
    法师: "编剧",
    牧师: "织命师",
    刺客: "窃命之贼",
    猎人: "终末之笔",
    歌者: "预言家",
  },
};

const JOB_TYPE_AFFINITIES = {
  战士: ["战争", "秩序", "诞育", "腐朽", "记忆", "时间", "繁荣"],
  法师: ["真理", "湮灭", "时间", "混乱", "死亡", "污堕", "痴愚"],
  牧师: ["诞育", "繁荣", "死亡", "腐朽", "秩序", "战争", "时间", "欺诈"],
  刺客: ["湮灭", "死亡", "欺诈", "沉默", "时间", "真理", "污堕"],
  猎人: ["繁荣", "记忆", "沉默", "命运", "欺诈", "战争", "死亡"],
  歌者: ["命运", "混乱", "欺诈", "痴愚", "沉默", "腐朽", "污堕"],
};

export const useBeliefTest = () => {

  const questionsList =
    typeof quizQuestions !== "undefined" ? quizQuestions : [];
  const charactersList =
    typeof quizCharacters !== "undefined" ? quizCharacters : [];

  const state = reactive({
    showCommunityPage: true,
    communityInfo: {
      title: "欢迎加入WIKI官方社区",
      avatar: "/avatar.png",
      name: "QQ频道",
      description: "zsyxwiki233",
      joinLink: "https://pd.qq.com/s/7hfn4j2na",
    },
    currentQuestionIndex: 0,
    factionScores: {},
    initialFactionScores: {},
    userAnswers: {},
    topFaction: null,
    secondFaction: null,
    topFactionBranch: null,
    secondFactionBranch: null,
    credibilityScore: 100,
    credibilityRating: "完全可信",
    mainFactionPreferenceData: [],
    branchFactionPreferenceData: [],
    matchedCharacter: null,
    showCharacterResult: false,
    recommendedPrimaryJob: null,
    recommendedSecondaryJob: null,
    factions: ["生命", "沉沦", "文明", "混沌", "存在", "虚无"],
    factionBranches: {
      生命: ["诞育", "繁荣", "死亡"],
      沉沦: ["污堕", "腐朽", "湮灭"],
      文明: ["秩序", "真理", "战争"],
      混沌: ["混乱", "痴愚", "沉默"],
      存在: ["记忆", "时间"],
      虚无: ["欺诈", "命运"],
    },
    opposingFactions: {
      生命: "沉沦",
      沉沦: "生命",
      文明: "混沌",
      混沌: "文明",
      存在: "虚无",
      虚无: "存在",
    },
    conflictPairs: [
      ["STRONG_秩序", "STRONG_混乱"],
      ["STRONG_秩序", "STRONG_痴愚"],
      ["STRONG_秩序", "STRONG_沉沦"],
      ["STRONG_秩序", "OPPOSE_秩序"],
      ["STRONG_文明", "STRONG_混乱"],
      ["STRONG_文明", "STRONG_沉沦"],
      ["STRONG_文明", "STRONG_虚无"],
      ["STRONG_文明", "STRONG_湮灭"],
      ["STRONG_文明", "OPPOSE_文明"],
      ["STRONG_混乱", "STRONG_秩序"],
      ["STRONG_混乱", "STRONG_真理"],
      ["STRONG_混乱", "OPPOSE_混乱"],
      ["STRONG_混沌", "STRONG_秩序"],
      ["STRONG_混沌", "STRONG_文明"],
      ["STRONG_混沌", "OPPOSE_混沌"],
      ["STRONG_生命", "STRONG_沉沦"],
      ["STRONG_生命", "STRONG_湮灭"],
      ["STRONG_生命", "STRONG_死亡"],
      ["STRONG_生命", "STRONG_腐朽"],
      ["STRONG_生命", "STRONG_沉默"],
      ["STRONG_生命", "STRONG_虚无"],
      ["STRONG_生命", "OPPOSE_生命"],
      ["STRONG_繁荣", "STRONG_湮灭"],
      ["STRONG_繁荣", "STRONG_死亡"],
      ["STRONG_繁荣", "STRONG_腐朽"],
      ["STRONG_繁荣", "STRONG_沉默"],
      ["STRONG_繁荣", "OPPOSE_繁荣"],
      ["STRONG_诞育", "STRONG_湮灭"],
      ["STRONG_诞育", "STRONG_死亡"],
      ["STRONG_诞育", "STRONG_腐朽"],
      ["STRONG_诞育", "OPPOSE_诞育"],
      ["STRONG_沉沦", "STRONG_繁荣"],
      ["STRONG_沉沦", "STRONG_秩序"],
      ["STRONG_沉沦", "OPPOSE_沉沦"],
      ["STRONG_湮灭", "STRONG_繁荣"],
      ["STRONG_湮灭", "STRONG_诞育"],
      ["STRONG_湮灭", "STRONG_秩序"],
      ["STRONG_湮灭", "STRONG_存在"],
      ["STRONG_湮灭", "OPPOSE_湮灭"],
      ["STRONG_真理", "STRONG_欺诈"],
      ["STRONG_真理", "STRONG_混乱"],
      ["STRONG_真理", "STRONG_痴愚"],
      ["STRONG_真理", "STRONG_虚无"],
      ["STRONG_真理", "OPPOSE_真理"],
      ["STRONG_欺诈", "STRONG_秩序"],
      ["STRONG_欺诈", "STRONG_真理"],
      ["STRONG_欺诈", "OPPOSE_欺诈"],
      ["STRONG_存在", "STRONG_虚无"],
      ["STRONG_存在", "STRONG_湮灭"],
      ["STRONG_存在", "STRONG_沉默"],
      ["STRONG_存在", "OPPOSE_存在"],
      ["STRONG_虚无", "STRONG_秩序"],
      ["STRONG_虚无", "STRONG_繁荣"],
      ["STRONG_虚无", "STRONG_存在"],
      ["STRONG_虚无", "OPPOSE_虚无"],
      ["STRONG_记忆", "STRONG_湮灭"],
      ["STRONG_记忆", "STRONG_沉默"],
      ["STRONG_记忆", "OPPOSE_记忆"],
      ["STRONG_时间", "STRONG_湮灭"],
      ["STRONG_时间", "OPPOSE_时间"],
      ["STRONG_沉默", "STRONG_繁荣"],
      ["STRONG_沉默", "STRONG_诞育"],
      ["STRONG_沉默", "STRONG_秩序"],
      ["STRONG_沉默", "OPPOSE_沉默"],
      ["STRONG_死亡", "STRONG_繁荣"],
      ["STRONG_死亡", "STRONG_诞育"],
      ["STRONG_死亡", "OPPOSE_死亡"],
      ["OPPOSE_秩序", "STRONG_秩序"],
      ["OPPOSE_混乱", "STRONG_混乱"],
      ["OPPOSE_文明", "STRONG_文明"],
      ["OPPOSE_混沌", "STRONG_混沌"],
      ["OPPOSE_生命", "STRONG_生命"],
      ["OPPOSE_沉沦", "STRONG_沉沦"],
      ["OPPOSE_存在", "STRONG_存在"],
      ["OPPOSE_虚无", "STRONG_虚无"],
      ["OPPOSE_真理", "STRONG_真理"],
      ["OPPOSE_欺诈", "STRONG_欺诈"],
      ["OPPOSE_繁荣", "STRONG_繁荣"],
      ["OPPOSE_诞育", "STRONG_诞育"],
      ["OPPOSE_湮灭", "STRONG_湮灭"],
      ["OPPOSE_腐朽", "STRONG_腐朽"],
      ["OPPOSE_记忆", "STRONG_记忆"],
      ["OPPOSE_时间", "STRONG_时间"],
      ["OPPOSE_沉默", "STRONG_沉默"],
      ["OPPOSE_死亡", "STRONG_死亡"],
      ["OPPOSE_痴愚", "STRONG_痴愚"],
    ],
  });


  const startQuiz = () => {
    state.showCommunityPage = false;
  };
  const previousQuestion = () => {
    if (state.currentQuestionIndex > 0) state.currentQuestionIndex--;
  };

  const initializeFactionScores = () => {
    state.initialFactionScores = {};
    state.factionScores = {};
    state.factions.forEach((f) => (state.initialFactionScores[f] = 0));
    for (const f in state.factionBranches) {
      state.factionBranches[f].forEach((b) => (state.factionScores[b] = 0));
    }
  };

  const selectOption = (optionText, optionIndex) => {
    state.userAnswers[state.currentQuestionIndex] = optionIndex;
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex === questionsList.length) {
      calculateResults();
    }
  };

  const getCredibilityRating = (score) => {
    if (score <= 10) return "无意义";
    if (score <= 25) return "小丑";
    if (score <= 40) return "骗子";
    if (score <= 60) return "平庸";
    if (score <= 75) return "摇摆不定";
    if (score <= 90) return "真诚";
    return "这不就是我吗！";
  };

  const calculateCredibility = () => {
    let collectedTags = new Set();
    let totalStrongTags = 0;
    for (let i = 0; i < questionsList.length; i++) {
      const ansIdx = state.userAnswers[i];
      if (ansIdx !== undefined && questionsList[i]?.credibilityTags?.[ansIdx]) {
        questionsList[i].credibilityTags[ansIdx].forEach((tag) => {
          if (tag.startsWith("STRONG_") || tag.startsWith("OPPOSE_")) {
            collectedTags.add(tag);
            totalStrongTags++;
          }
        });
      }
    }
    let numberOfConflicts = 0;
    const checkedPairs = new Set();
    state.conflictPairs.forEach((pair) => {
      const tag1 = pair[0],
        tag2 = pair[1],
        key1 = `${tag1}-${tag2}`,
        key2 = `${tag2}-${tag1}`;
      if (!checkedPairs.has(key1) && !checkedPairs.has(key2)) {
        if (collectedTags.has(tag1) && collectedTags.has(tag2))
          numberOfConflicts++;
        checkedPairs.add(key1);
      }
    });
    let conflictRatio =
      totalStrongTags > 0 ? numberOfConflicts / totalStrongTags : 0;
    state.credibilityScore = Math.round(
      100 *
        Math.max(
          0,
          1 - conflictRatio * SCORE_WEIGHTS.CREDIBILITY_SCALING_FACTOR,
        ),
    );
    state.credibilityRating = getCredibilityRating(state.credibilityScore);
  };

  const calculateRecommendedJob = () => {
    const branchesForAffinity = state.branchFactionPreferenceData
      .filter((b) => b.score > 0)
      .filter(
        (b) =>
          b.name !== state.topFactionBranch &&
          b.name !== state.secondFactionBranch,
      )
      .slice(0, 6);
    const affinityScores = branchesForAffinity.reduce((acc, b) => {
      acc[b.name] = b.score;
      return acc;
    }, {});
    const jobTypeScores = {};
    for (const jobType in JOB_TYPE_AFFINITIES) {
      jobTypeScores[jobType] = 0;
      JOB_TYPE_AFFINITIES[jobType].forEach((b) => {
        if (affinityScores[b]) jobTypeScores[jobType] += affinityScores[b];
      });
    }
    const sortedJobTypes = Object.keys(jobTypeScores).sort(
      (a, b) => jobTypeScores[b] - jobTypeScores[a],
    );
    const recommendedJobType =
      sortedJobTypes.length > 0 ? sortedJobTypes[0] : null;
    if (recommendedJobType) {
      if (state.topFactionBranch && state.topFactionBranch !== "核心") {
        const primaryJobName =
          jobsData[state.topFactionBranch]?.[recommendedJobType];
        if (primaryJobName)
          state.recommendedPrimaryJob = `${recommendedJobType} - ${primaryJobName}`;
      }
      if (
        state.secondFactionBranch &&
        state.secondFactionBranch !== "其他分支" &&
        state.secondFactionBranch !== "核心" &&
        state.secondFactionBranch !== "无分支"
      ) {
        const secondaryJobName =
          jobsData[state.secondFactionBranch]?.[recommendedJobType];
        if (secondaryJobName)
          state.recommendedSecondaryJob = `${recommendedJobType} - ${secondaryJobName}`;
      }
    }
  };

  const calculateResults = () => {
    initializeFactionScores();
    for (let i = 0; i < questionsList.length; i++) {
      const optionIndex = state.userAnswers[i];
      if (optionIndex !== undefined) {
        const selectedOptionScores = questionsList[i].scores[optionIndex];
        if (selectedOptionScores) {
          for (const fOrB in selectedOptionScores) {
            const score = selectedOptionScores[fOrB];
            if (state.factions.includes(fOrB)) {
              state.initialFactionScores[fOrB] =
                (state.initialFactionScores[fOrB] || 0) + score;
            } else {
              let mainFaction = Object.keys(state.factionBranches).find((k) =>
                state.factionBranches[k].includes(fOrB),
              );
              if (mainFaction)
                state.factionScores[fOrB] =
                  (state.factionScores[fOrB] || 0) + score;
            }
          }
        }
      }
    }

    const mainFactionTotalScores = {};
    for (const fName of state.factions) {
      let totalBranchScore = 0,
        branchCount = 0;
      if (state.factionBranches[fName]) {
        state.factionBranches[fName].forEach((b) => {
          totalBranchScore += state.factionScores[b] || 0;
          branchCount++;
        });
      }
      const avgBranch = branchCount > 0 ? totalBranchScore / branchCount : 0;
      const mainInitial = state.initialFactionScores[fName] || 0;
      const oppName = state.opposingFactions[fName];
      const oppInitial = state.initialFactionScores[oppName] || 0;
      mainFactionTotalScores[fName] =
        mainInitial * SCORE_WEIGHTS.MAIN_FACTION_FROM_SELF +
        avgBranch * SCORE_WEIGHTS.MAIN_FACTION_FROM_BRANCH_AVG -
        oppInitial * SCORE_WEIGHTS.MAIN_FACTION_PENALTY_FROM_OPPOSING;
    }

    let topFactionName = null,
      maxMainScore = -Infinity,
      sortedMainFactions = [];
    for (const f in mainFactionTotalScores) {
      sortedMainFactions.push({ name: f, score: mainFactionTotalScores[f] });
      if (mainFactionTotalScores[f] > maxMainScore) {
        maxMainScore = mainFactionTotalScores[f];
        topFactionName = f;
      }
    }
    sortedMainFactions.sort((a, b) => b.score - a.score);
    state.topFaction = topFactionName || "未知信仰";

    let topBranchName = null,
      maxBranchInitial = -Infinity;
    if (
      state.topFaction !== "未知信仰" &&
      state.factionBranches[state.topFaction]
    ) {
      state.factionBranches[state.topFaction].forEach((b) => {
        const bScore = state.factionScores[b] || 0;
        if (bScore > maxBranchInitial) {
          maxBranchInitial = bScore;
          topBranchName = b;
        }
      });
    }
    state.topFactionBranch =
      maxBranchInitial <= 0 ? "核心" : topBranchName || "核心";

    const finalBranchForSecondary = {};
    for (const f in state.factionBranches) {
      const mainInitial = state.initialFactionScores[f] || 0;
      const oppInitial =
        state.initialFactionScores[state.opposingFactions[f]] || 0;
      state.factionBranches[f].forEach((b) => {
        const bInitial = state.factionScores[b] || 0;
        finalBranchForSecondary[b] =
          bInitial * SCORE_WEIGHTS.SECONDARY_BRANCH_FROM_SELF +
          mainInitial * SCORE_WEIGHTS.SECONDARY_BRANCH_FROM_MAIN_FACTION -
          oppInitial * SCORE_WEIGHTS.SECONDARY_BRANCH_PENALTY_FROM_OPPOSING;
      });
    }

    const sortedBranchesForSec = Object.entries(finalBranchForSecondary)
      .sort(([, a], [, b]) => b - a)
      .map(([b]) => b);
    let secBranchResult = null;
    const filteredBranchesForSec = sortedBranchesForSec.filter((b) => {
      if (finalBranchForSecondary[b] <= 0) return false;
      let parentF = null;
      for (const f in state.factionBranches) {
        if (state.factionBranches[f].includes(b)) {
          parentF = f;
          break;
        }
      }
      if (parentF === state.topFaction && b === state.topFactionBranch)
        return false;
      return true;
    });

    if (filteredBranchesForSec.length > 0) {
      const topBSec = filteredBranchesForSec[0];
      let topBMainForSec = null;
      for (const f in state.factionBranches) {
        if (state.factionBranches[f].includes(topBSec)) {
          topBMainForSec = f;
          break;
        }
      }
      if (topBMainForSec !== state.topFaction) {
        secBranchResult = topBSec;
      } else if (filteredBranchesForSec.length >= 2) {
        const secondBSec = filteredBranchesForSec[1];
        let secondBMain = null;
        for (const f in state.factionBranches) {
          if (state.factionBranches[f].includes(secondBSec)) {
            secondBMain = f;
            break;
          }
        }
        if (secondBMain !== state.topFaction) {
          const topScore = finalBranchForSecondary[topBSec] || 0;
          const secondScore = finalBranchForSecondary[secondBSec] || 0;
          const coeff = secondScore === 0 ? Infinity : topScore / secondScore;
          secBranchResult =
            coeff < SCORE_WEIGHTS.SECONDARY_CHOICE_COEFFICIENT
              ? secondBSec
              : topBSec;
        } else {
          secBranchResult = topBSec;
        }
      } else {
        secBranchResult = topBSec;
      }
    }
    state.secondFactionBranch = secBranchResult || "其他分支";

    if (state.secondFactionBranch && state.secondFactionBranch !== "其他分支") {
      let found = false;
      for (const f in state.factionBranches) {
        if (state.factionBranches[f].includes(state.secondFactionBranch)) {
          state.secondFaction = f;
          found = true;
          break;
        }
      }
      if (!found) state.secondFaction = "其他信仰";
    } else {
      if (
        sortedMainFactions.length > 1 &&
        sortedMainFactions[1].name !== state.topFaction &&
        sortedMainFactions[1].score > 0
      ) {
        state.secondFaction = sortedMainFactions[1].name;
        state.secondFactionBranch = "核心";
      } else if (
        sortedMainFactions.length > 2 &&
        sortedMainFactions[2].name !== state.topFaction &&
        sortedMainFactions[2].score > 0
      ) {
        state.secondFaction = sortedMainFactions[2].name;
        state.secondFactionBranch = "核心";
      } else {
        state.secondFaction = "其他信仰";
        state.secondFactionBranch = "无分支";
      }
    }

    // 图表
    const processChartData = (scoresDict) => {
      const arr = [];
      let totalAbs = 0;
      for (const k in scoresDict) totalAbs += Math.abs(scoresDict[k] || 0);
      if (totalAbs === 0) totalAbs = 1;
      for (const k in scoresDict) {
        const score = scoresDict[k] || 0;
        let val = parseFloat(((Math.abs(score) / totalAbs) * 100).toFixed(1));
        arr.push({
          name: k,
          percentage: score < 0 ? `-${val.toFixed(1)}` : val.toFixed(1),
          percentageValue: val,
          score: score,
        });
      }
      return arr.sort((a, b) => b.score - a.score);
    };
    state.mainFactionPreferenceData = processChartData(mainFactionTotalScores);
    state.branchFactionPreferenceData = processChartData(
      finalBranchForSecondary,
    );

    calculateCredibility();
    calculateRecommendedJob();
  };

  const findMatchedCharacter = () => {
    const charScores = {};
    const bPercent = state.branchFactionPreferenceData.reduce((acc, i) => {
      acc[i.name] = parseFloat(i.percentage);
      return acc;
    }, {});
    const mScores = state.mainFactionPreferenceData.reduce((acc, i) => {
      acc[i.name] = i.score;
      return acc;
    }, {});

    charactersList.forEach((c) => {
      let currentScore = 0;
      c.matchRules.forEach((r) => {
        let isMatch = false;
        switch (r.type) {
          case "PRIMARY_FACTION":
            if (state.topFaction === r.faction) isMatch = true;
            break;
          case "SECONDARY_FACTION":
            if (state.secondFaction === r.faction) isMatch = true;
            break;
          case "BRANCH_PERCENT_RANGE": {
            const p = bPercent[r.branch] || 0;
            if (p >= r.min && p <= r.max) isMatch = true;
            break;
          }
          case "BRANCH_PERCENT_COMPARE_VALUE": {
            const p = bPercent[r.branch] || 0;
            if (r.comparison === "GREATER_THAN" && p > r.value) isMatch = true;
            if (r.comparison === "LESS_THAN" && p < r.value) isMatch = true;
            break;
          }
          case "BRANCH_PERCENT_COMPARE_BRANCH": {
            const p1 = bPercent[r.branch1] || 0,
              p2 = bPercent[r.branch2] || 0;
            if (r.comparison === "GREATER_THAN" && p1 > p2) isMatch = true;
            if (r.comparison === "LESS_THAN" && p1 < p2) isMatch = true;
            break;
          }
          case "FACTION_SCORE_COMPARE_VALUE": {
            const s = mScores[r.faction] || 0;
            if (r.comparison === "GREATER_THAN" && s > r.value) isMatch = true;
            if (r.comparison === "LESS_THAN" && s < r.value) isMatch = true;
            break;
          }
        }
        if (isMatch) currentScore += r.points;
      });
      charScores[c.name] = currentScore;
    });

    let bestMatch = null,
      maxScore = 0;
    charactersList.forEach((c) => {
      const s = charScores[c.name];
      if (s > maxScore && s >= (c.minTotalPoints || 0)) {
        maxScore = s;
        bestMatch = c;
      }
    });
    state.matchedCharacter = bestMatch;
    state.showCharacterResult = true;
  };

  const formatMatchReason = (c) => {
    if (!c || !c.matchReasonTemplate) return "";
    const bPercent = state.branchFactionPreferenceData.reduce((acc, i) => {
      acc[i.name] = i.percentage;
      return acc;
    }, {});
    return c.matchReasonTemplate.replace(
      /\{(.+?)\}/g,
      (match, bName) => bPercent[bName] || "未知",
    );
  };

  const restartQuiz = () => {
    state.currentQuestionIndex = 0;
    state.userAnswers = {};
    initializeFactionScores();
    state.topFaction = null;
    state.secondFaction = null;
    state.topFactionBranch = null;
    state.secondFactionBranch = null;
    state.credibilityScore = 100;
    state.credibilityRating = "完全可信";
    state.mainFactionPreferenceData = [];
    state.branchFactionPreferenceData = [];
    state.matchedCharacter = null;
    state.showCharacterResult = false;
    state.recommendedPrimaryJob = null;
    state.recommendedSecondaryJob = null;
    state.showCommunityPage = true;
  };

  // 初始化
  initializeFactionScores();

  return {
    ...toRefs(state),
    questionsList,
    charactersList,
    startQuiz,
    selectOption,
    previousQuestion,
    restartQuiz,
    findMatchedCharacter,
    formatMatchReason,
  };
};
