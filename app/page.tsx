"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/teal.css";

const sections = [
  "اهداف",
  "تحلیل وضعیت موجود",
  "استراتژی کلی",
  "اقدامات",
  "مسئولیت ها",
  "زمان بندی",
  "شاخص های عملکرد",
  "گزارش های نهایی",
  "بوم کسب و کار",
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(sections[0]);
    // === مدیریت پروژه‌ها ===
  const [projects, setProjects] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projectName, setProjectName] = useState("اکشن پلن جدید");

  // بارگذاری پروژه‌ها از localStorage
  useEffect(() => {
    const saved = localStorage.getItem("actionPlans");
    if (saved) {
      const parsedProjects = JSON.parse(saved);
      setProjects(parsedProjects);
      if (parsedProjects.length > 0) {
        const latest = parsedProjects[0];
        setCurrentProjectId(latest.id);
        setProjectName(latest.name);
        loadProjectData(latest.data);
      }
    } else {
      // ایجاد پروژه اول
      createNewProject();
    }
  }, []);

  const createNewProject = () => {
    const newId = Date.now();
    const newProject = {
      id: newId,
      name: projectName || `اکشن پلن ${new Date().toLocaleDateString('fa-IR')}`,
      timestamp: Date.now(),
      data: {}
    };
    setCurrentProjectId(newId);
    setProjects(prev => [newProject, ...prev]);
    localStorage.setItem("actionPlans", JSON.stringify([newProject, ...projects]));
    resetAllData();
  };

  const loadProjectData = (data) => {
    if (!data) return;
    setGoal(data.goal || "");
    setObjectives(data.objectives || [{ id: 1, title: "", kpis: [""], startDate: "", endDate: "", priority: "متوسط" }]);
    setCurrentStatus(data.currentStatus || "");
    setEvidenceTexts(data.evidenceTexts || [""]);
    setChartGroups(data.chartGroups || [{ title: "", data: [{ x: "", y: "" }] }]);
    setChallenges(data.challenges || [""]);
    setStrengths(data.strengths || [""]);
    setWeaknesses(data.weaknesses || [""]);
    setOpportunities(data.opportunities || [""]);
    setThreats(data.threats || [""]);
    setStakeholders(data.stakeholders || [""]);
    setResources(data.resources || [""]);
    setGapAnalysis(data.gapAnalysis || "");
    setStrategicDirection(data.strategicDirection || "");
    setKeyStrategies(data.keyStrategies || [""]);
    setStrategyLogic(data.strategyLogic || "");
    setFocusAreas(data.focusAreas || [""]);
    setStrategicPriorities(data.strategicPriorities || [""]);
    setExpectedResults(data.expectedResults || [""]);
    setActions(data.actions || [{ id: 1, description: "", owner: "", startDate: "", endDate: "", resources: "", expectedOutput: "", measurementCriteria: "", status: "در انتظار" }]);
    setResponsibilities(data.responsibilities || []);
    setSchedulePhases(data.schedulePhases || []);
    setKpiMetrics(data.kpiMetrics || []);
    setBmc(data.bmc || {
      keyPartners: "", keyActivities: "", valuePropositions: "", customerRelationships: "",
      customerSegments: "", keyResources: "", channels: "", costStructure: "", revenueStreams: ""
    });
  };

  const resetAllData = () => {
    setGoal("");
    setObjectives([{ id: 1, title: "", kpis: [""], startDate: "", endDate: "", priority: "متوسط" }]);
    setCurrentStatus("");
    setEvidenceTexts([""]);
    setChartGroups([{ title: "", data: [{ x: "", y: "" }] }]);
    setChallenges([""]);
    setStrengths([""]);
    setWeaknesses([""]);
    setOpportunities([""]);
    setThreats([""]);
    setStakeholders([""]);
    setResources([""]);
    setGapAnalysis("");
    setStrategicDirection("");
    setKeyStrategies([""]);
    setStrategyLogic("");
    setFocusAreas([""]);
    setStrategicPriorities([""]);
    setExpectedResults([""]);
    setActions([{ id: 1, description: "", owner: "", startDate: "", endDate: "", resources: "", expectedOutput: "", measurementCriteria: "", status: "در انتظار" }]);
    setResponsibilities([{
      id: 1,
      action: "",
      unitAssignments: defaultUnits.reduce((acc, unit) => { acc[unit] = false; return acc; }, {})
    }]);
    setSchedulePhases([{
      id: 1,
      phaseTitle: "فاز 1",
      milestones: [{ id: 1, action: "", owner: "", startDate: "", endDate: "", duration: 0, status: "در انتظار" }]
    }]);
    setKpiMetrics([{
      id: 1, relatedGoal: "", kpiName: "", baseline: "", target: "", measurementMethod: "", frequency: "ماهانه", responsibleUnit: ""
    }]);
    setBmc({
      keyPartners: "", keyActivities: "", valuePropositions: "", customerRelationships: "",
      customerSegments: "", keyResources: "", channels: "", costStructure: "", revenueStreams: ""
    });
  };
  
  // --- اهداف ---
  const [goal, setGoal] = useState("");
  const [objectives, setObjectives] = useState([
    {
      id: 1,
      title: "",
      kpis: [""],
      startDate: "",
      endDate: "",
      priority: "متوسط",
    },
  ]);

  const addObjective = () => {
    setObjectives([
      ...objectives,
      {
        id: Date.now(),
        title: "",
        kpis: [""],
        startDate: "",
        endDate: "",
        priority: "متوسط",
      },
    ]);
  };

  const updateObjective = (id: number, field: string, value: any) => {
    setObjectives(
      objectives.map((obj) =>
        obj.id === id ? { ...obj, [field]: value } : obj
      )
    );
  };

  const addKPI = (objId: number) => {
    setObjectives(
      objectives.map((obj) =>
        obj.id === objId ? { ...obj, kpis: [...obj.kpis, ""] } : obj
      )
    );
  };

  const updateKPI = (objId: number, index: number, value: string) => {
    setObjectives(
      objectives.map((obj) => {
        if (obj.id === objId) {
          const newKpis = [...obj.kpis];
          newKpis[index] = value;
          return { ...obj, kpis: newKpis };
        }
        return obj;
      })
    );
  };

  // --- تحلیل وضعیت موجود ---
  const [currentStatus, setCurrentStatus] = useState("");
  const [evidenceTexts, setEvidenceTexts] = useState([""]);
  const [chartGroups, setChartGroups] = useState([
    {
      title: "",
      data: [{ x: "", y: "" }],
    },
  ]);
  const [challenges, setChallenges] = useState([""]);
  const [strengths, setStrengths] = useState([""]);
  const [weaknesses, setWeaknesses] = useState([""]);
  const [opportunities, setOpportunities] = useState([""]);
  const [threats, setThreats] = useState([""]);
  const [stakeholders, setStakeholders] = useState([""]);
  const [resources, setResources] = useState([""]);
  const [gapAnalysis, setGapAnalysis] = useState("");

  // --- استراتژی ها ---
  const [strategicDirection, setStrategicDirection] = useState("");
  const [keyStrategies, setKeyStrategies] = useState([""]);
  const [strategyLogic, setStrategyLogic] = useState("");
  const [focusAreas, setFocusAreas] = useState([""]);
  const [strategicPriorities, setStrategicPriorities] = useState([""]);
  const [expectedResults, setExpectedResults] = useState([""]);

  // --- اقدامات ---
  const [actions, setActions] = useState([
    {
      id: 1,
      description: "",
      owner: "",
      startDate: "",
      endDate: "",
      resources: "",
      expectedOutput: "",
      measurementCriteria: "",
      status: "در انتظار",
    },
  ]);

  const addAction = () => {
    setActions([
      ...actions,
      {
        id: Date.now(),
        description: "",
        owner: "",
        startDate: "",
        endDate: "",
        resources: "",
        expectedOutput: "",
        measurementCriteria: "",
        status: "در انتظار",
      },
    ]);
  };

  const updateAction = (id: number, field: string, value: any) => {
    setActions(
      actions.map((action) =>
        action.id === id ? { ...action, [field]: value } : action
      )
    );
  };

  // --- مسئولیت ها ---
  const defaultUnits = ["مدیر پروژه", "تیم فنی", "واحد فروش", "واحد مالی", "واحد حقوقی", "واحد توسعه", "واحد اجرایی", "واحد مارکتینگ"];
  const [customUnits, setCustomUnits] = useState<string[]>([]);
  const allUnits = [...defaultUnits, ...customUnits];

  const [responsibilities, setResponsibilities] = useState([
    {
      id: 1,
      action: "",
      unitAssignments: allUnits.reduce((acc, unit) => {
        acc[unit] = false; // false means not assigned
        return acc;
      }, {} as Record<string, boolean>),
    },
  ]);

  const addResponsibilityRow = () => {
    setResponsibilities([
      ...responsibilities,
      {
        id: Date.now(),
        action: "",
        unitAssignments: allUnits.reduce((acc, unit) => {
          acc[unit] = false;
          return acc;
        }, {} as Record<string, boolean>),
      },
    ]);
  };

  const addUnit = () => {
    const newUnitName = prompt("نام واحد جدید را وارد کنید:");
    if (newUnitName && !allUnits.includes(newUnitName)) {
      setCustomUnits([...customUnits, newUnitName]);
      // Update existing rows to include the new unit
      setResponsibilities(responsibilities.map(resp => ({
        ...resp,
        unitAssignments: {
          ...resp.unitAssignments,
          [newUnitName]: false,
        }
      })));
    } else if (newUnitName) {
      alert("این واحد قبلا اضافه شده است.");
    }
  };

  const updateResponsibilityAction = (id: number, value: string) => {
    setResponsibilities(responsibilities.map(resp =>
      resp.id === id ? { ...resp, action: value } : resp
    ));
  };

  const toggleUnitAssignment = (respId: number, unit: string) => {
    setResponsibilities(responsibilities.map(resp =>
      resp.id === respId
        ? {
            ...resp,
            unitAssignments: {
              ...resp.unitAssignments,
              [unit]: !resp.unitAssignments[unit],
            },
          }
        : resp
    ));
  };

  const removeResponsibilityRow = (id: number) => {
    if (responsibilities.length === 1) return;
    setResponsibilities(responsibilities.filter(resp => resp.id !== id));
  };

  // --- زمان بندی ---
  const [schedulePhases, setSchedulePhases] = useState([
    {
      id: 1,
      phaseTitle: "فاز 1",
      milestones: [
        {
          id: 1,
          action: "",
          owner: "",
          startDate: "",
          endDate: "",
          duration: 0,
          status: "در انتظار",
        },
      ],
    },
  ]);

  const addSchedulePhase = () => {
    const phaseTitle = prompt("عنوان فاز جدید را وارد کنید:");
    if (phaseTitle) {
      setSchedulePhases([
        ...schedulePhases,
        {
          id: Date.now(),
          phaseTitle: phaseTitle,
          milestones: [
            {
              id: Date.now() + 1,
              action: "",
              owner: "",
              startDate: "",
              endDate: "",
              duration: 0,
              status: "در انتظار",
            },
          ],
        },
      ]);
    }
  };

  const updateMilestone = (
    phaseId: number,
    milestoneId: number,
    field: string,
    value: any
  ) => {
    setSchedulePhases(
      schedulePhases.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              milestones: phase.milestones.map((ms) =>
                ms.id === milestoneId ? { ...ms, [field]: value } : ms
              ),
            }
          : phase
      )
    );
  };

  const addMilestone = (phaseId: number) => {
    setSchedulePhases(
      schedulePhases.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              milestones: [
                ...phase.milestones,
                {
                  id: Date.now(),
                  action: "",
                  owner: "",
                  startDate: "",
                  endDate: "",
                  duration: 0,
                  status: "در انتظار",
                },
              ],
            }
          : phase
      )
    );
  };

  const removeMilestone = (phaseId: number, milestoneId: number) => {
     if (schedulePhases.find(p => p.id === phaseId)?.milestones.length === 1) return;
    setSchedulePhases(
      schedulePhases.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              milestones: phase.milestones.filter(
                (ms) => ms.id !== milestoneId
              ),
            }
          : phase
      )
    );
  };

  const removePhase = (phaseId: number) => {
    if (schedulePhases.length === 1) return;
    setSchedulePhases(schedulePhases.filter((phase) => phase.id !== phaseId));
  };

  // --- شاخص های عملکرد ---
  const [kpiMetrics, setKpiMetrics] = useState([
    {
      id: 1,
      relatedGoal: "",
      kpiName: "",
      baseline: "",
      target: "",
      measurementMethod: "",
      frequency: "ماهانه",
      responsibleUnit: "",
    },
  ]);

  const addKpiMetric = () => {
    setKpiMetrics([
      ...kpiMetrics,
      {
        id: Date.now(),
        relatedGoal: "",
        kpiName: "",
        baseline: "",
        target: "",
        measurementMethod: "",
        frequency: "ماهانه",
        responsibleUnit: "",
      },
    ]);
  };

  const updateKpiMetric = (id: number, field: string, value: any) => {
    setKpiMetrics(
      kpiMetrics.map((kpi) =>
        kpi.id === id ? { ...kpi, [field]: value } : kpi
      )
    );
  };

  const removeKpiMetric = (id: number) => {
    if (kpiMetrics.length === 1) return;
    setKpiMetrics(kpiMetrics.filter((kpi) => kpi.id !== id));
  };
    // --- بوم کسب و کار ---
  const [bmc, setBmc] = useState({
    keyPartners: "",
    keyActivities: "",
    valuePropositions: "",
    customerRelationships: "",
    customerSegments: "",
    keyResources: "",
    channels: "",
    costStructure: "",
    revenueStreams: "",
  });

  const updateBmc = (field: string, value: string) => {
    setBmc(prev => ({ ...prev, [field]: value }));
  };
    // ذخیره خودکار در localStorage
  useEffect(() => {
    if (!currentProjectId) return;

    const projectData = {
      goal, objectives, currentStatus, evidenceTexts, chartGroups, challenges,
      strengths, weaknesses, opportunities, threats, stakeholders, resources,
      gapAnalysis, strategicDirection, keyStrategies, strategyLogic, focusAreas,
      strategicPriorities, expectedResults, actions, responsibilities,
      schedulePhases, kpiMetrics, bmc
    };

    const updatedProjects = projects.map(p => 
      p.id === currentProjectId 
        ? { ...p, name: projectName, timestamp: Date.now(), data: projectData }
        : p
    );

    setProjects(updatedProjects);
    localStorage.setItem("actionPlans", JSON.stringify(updatedProjects));
  }, [
    goal, objectives, currentStatus, evidenceTexts, chartGroups, challenges,
    strengths, weaknesses, opportunities, threats, stakeholders, resources,
    gapAnalysis, strategicDirection, keyStrategies, strategyLogic, focusAreas,
    strategicPriorities, expectedResults, actions, responsibilities,
    schedulePhases, kpiMetrics, bmc, projectName, currentProjectId
  ]);
  // Helper to get duration between two dates in days
  const getDurationInDays = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    try {
      const start = new Date(startDate.replace(/\//g, "-"));
      const end = new Date(endDate.replace(/\//g, "-"));
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 for inclusive days
      return diffDays;
    } catch (e) {
      console.error("Error calculating duration:", e);
      return 0;
    }
  };

  // --- Helper Functions ---
  const updateList = (setter: any, list: any[], index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  const addItem = (setter: any, list: any[]) => {
    setter([...list, ""]);
  };

  // Charting functions
  const addChartGroup = () => {
    setChartGroups([
      ...chartGroups,
      {
        title: "",
        data: [{ x: "", y: "" }],
      },
    ]);
  };

  const updateChartTitle = (chartIndex: number, value: string) => {
    const newCharts = [...chartGroups];
    newCharts[chartIndex].title = value;
    setChartGroups(newCharts);
  };

  const addChartDataRow = (chartIndex: number) => {
    const newCharts = [...chartGroups];
    newCharts[chartIndex].data.push({ x: "", y: "" });
    setChartGroups(newCharts);
  };

  const updateChartData = (
    chartIndex: number,
    dataIndex: number,
    field: "x" | "y",
    value: string
  ) => {
    const newCharts = [...chartGroups];
    newCharts[chartIndex].data[dataIndex][field] = value;
    setChartGroups(newCharts);
  };

  const removeChartGroup = (chartIndex: number) => {
    if (chartGroups.length === 1) return;
    setChartGroups(chartGroups.filter((_, index) => index !== chartIndex));
  };

  const removeChartDataRow = (chartIndex: number, dataIndex: number) => {
    const newCharts = [...chartGroups];
    if (newCharts[chartIndex].data.length === 1) return;
    newCharts[chartIndex].data = newCharts[chartIndex].data.filter(
      (_, index) => index !== dataIndex
    );
    setChartGroups(newCharts);
  };

  const renderLineChart = (chart: any) => {
    const validChartItems = chart.data.filter(
      (item: any) =>
        item.x.trim() !== "" &&
        item.y.trim() !== "" &&
        !isNaN(Number(item.y))
    );

    const chartValues = validChartItems.map((item: any) => Number(item.y));
    const maxChartValue =
      chartValues.length > 0 ? Math.max(...chartValues) : 0;

    const chartWidth = 700;
    const chartHeight = 260;
    const chartPadding = 40;

    const chartPoints = validChartItems.map((item: any, index: number) => {
      const x =
        validChartItems.length === 1
          ? chartWidth / 2
          : chartPadding +
            (index * (chartWidth - chartPadding * 2)) /
              (validChartItems.length - 1);

      const y =
        maxChartValue === 0
          ? chartHeight - chartPadding
          : chartHeight -
            chartPadding -
            (Number(item.y) / maxChartValue) *
              (chartHeight - chartPadding * 2);

      return {
        x,
        y,
        label: item.x,
        value: item.y,
      };
    });

    const polylinePoints = chartPoints
      .map((point: any) => `${point.x},${point.y}`)
      .join(" ");

    if (validChartItems.length === 0) {
      return (
        <p className="text-sm text-slate-500">
          برای نمایش نمودار، حداقل یک سال و مقدار وارد کن.
        </p>
      );
    }

    return (
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full min-w-[600px] h-[280px]"
      >
        <line
          x1={chartPadding}
          y1={chartHeight - chartPadding}
          x2={chartWidth - chartPadding}
          y2={chartHeight - chartPadding}
          stroke="#475569"
          strokeWidth="2"
        />
        <line
          x1={chartPadding}
          y1={chartPadding}
          x2={chartPadding}
          y2={chartHeight - chartPadding}
          stroke="#475569"
          strokeWidth="2"
        />
        <text
          x={chartPadding - 10}
          y={chartPadding}
          fill="#94a3b8"
          fontSize="12"
          textAnchor="end"
        >
          {maxChartValue}
        </text>
        <text
          x={chartPadding - 10}
          y={chartHeight - chartPadding}
          fill="#94a3b8"
          fontSize="12"
          textAnchor="end"
        >
          0
        </text>
        {chartPoints.length > 1 && (
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />
        )}
        {chartPoints.map((point: any, index: number) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="5" fill="#3b82f6" />
            <text
              x={point.x}
              y={point.y - 12}
              fill="#e2e8f0"
              fontSize="12"
              textAnchor="middle"
            >
              {point.value}
            </text>
            <text
              x={point.x}
              y={chartHeight - chartPadding + 22}
              fill="#94a3b8"
              fontSize="12"
              textAnchor="middle"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-l border-slate-800 p-4" dir="rtl">
        <h2 className="text-xl font-bold mb-6 text-blue-400">
          پنل مدیریت پروژه
                  <div className="mb-6">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
              placeholder="نام پروژه"
            />
            <button
              onClick={createNewProject}
              className="bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700"
            >
              + جدید
            </button>
          </div>

          {projects.length > 0 && (
            <div className="max-h-40 overflow-y-auto text-sm">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setCurrentProjectId(proj.id);
                    setProjectName(proj.name);
                    loadProjectData(proj.data);
                  }}
                  className={`w-full text-right px-3 py-2 rounded mb-1 transition ${
                    proj.id === currentProjectId ? 'bg-blue-600' : 'hover:bg-slate-800'
                  }`}
                >
                  {proj.name}
                </button>
              ))}
            </div>
          )}
        </div>
        </h2>
        <div className="flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`text-right px-4 py-3 rounded-lg transition text-sm ${
                activeSection === section
                  ? "bg-blue-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-10 overflow-y-auto" dir="rtl">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 border-b border-slate-800 pb-4">
            {activeSection}
          </h1>

          {/* --- اهداف Section --- */}
          {activeSection === "اهداف" && (
            <div className="space-y-10">
              {/* Goal */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <label className="block text-blue-400 font-bold mb-3 text-lg">
                  Goal (هدف کلی)
                </label>
                <textarea
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none"
                  placeholder="هدف کلی پروژه..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>
              <hr className="border-slate-800" />
              {/* Objectives */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="flex justify-between mb-4">
                  <label className="text-blue-400 font-bold text-lg">
                    Specific Objectives
                  </label>
                  <button
                    onClick={addObjective}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    + هدف
                  </button>
                </div>
                {objectives.map((obj, index) => (
                  <input
                    key={obj.id}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 mb-2"
                    placeholder={`هدف ${index + 1}`}
                    value={obj.title}
                    onChange={(e) =>
                      updateObjective(obj.id, "title", e.target.value)
                    }
                  />
                ))}
              </div>
              <hr className="border-slate-800" />
              {/* KPI */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <label className="text-blue-400 font-bold text-lg block mb-4">
                  KPI / Metrics
                </label>
                {objectives.map((obj) => (
                  <div key={obj.id} className="mb-6">
                    <p className="text-sm text-slate-400 mb-2">
                      برای هدف: {obj.title || "---"}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {obj.kpis.map((kpi, i) => (
                        <input
                          key={i}
                          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
                          placeholder="KPI"
                          value={kpi}
                          onChange={(e) =>
                            updateKPI(obj.id, i, e.target.value)
                          }
                        />
                      ))}
                      <button
                        onClick={() => addKPI(obj.id)}
                        className="bg-slate-700 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="border-slate-800" />
              {/* Timeframe */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 overflow-x-auto">
                <label className="block text-blue-400 font-bold mb-4 text-lg">
                  Timeframe
                </label>
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-slate-800 text-sm text-slate-400">
                      <th className="px-2 pb-2">هدف</th>
                      <th className="px-2 pb-2">شروع</th>
                      <th className="px-2 pb-2">پایان</th>
                    </tr>
                  </thead>
                  <tbody>
                    {objectives.map((obj) => (
                      <tr key={obj.id} className="border-b border-slate-800">
                        <td className="py-3 px-2 text-sm">{obj.title || "---"}</td>
                        <td className="py-3 px-2">
                          <DatePicker
                            value={obj.startDate}
                            onChange={(date: any) =>
                              updateObjective(
                                obj.id,
                                "startDate",
                                date ? date.format("YYYY/MM/DD") : ""
                              )
                            }
                            calendar={persian}
                            locale={persian_fa}
                            format="YYYY/MM/DD"
                            className="teal"
                            inputClass="bg-slate-800 border border-slate-700 rounded p-2 text-xs w-full text-white"
                            placeholder="انتخاب تاریخ"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <DatePicker
                            value={obj.endDate}
                            onChange={(date: any) =>
                              updateObjective(
                                obj.id,
                                "endDate",
                                date ? date.format("YYYY/MM/DD") : ""
                              )
                            }
                            calendar={persian}
                            locale={persian_fa}
                            format="YYYY/MM/DD"
                            className="teal"
                            inputClass="bg-slate-800 border border-slate-700 rounded p-2 text-xs w-full text-white"
                            placeholder="انتخاب تاریخ"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr className="border-slate-800" />
              {/* Priority */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <label className="block text-blue-400 font-bold mb-4 text-lg">
                  Priority
                </label>
                <div className="space-y-3">
                  {objectives.map((obj) => (
                    <div
                      key={obj.id}
                      className="flex justify-between bg-slate-800 p-3 rounded"
                    >
                      <span>{obj.title || "---"}</span>
                      <select
                        value={obj.priority}
                        onChange={(e) =>
                          updateObjective(obj.id, "priority", e.target.value)
                        }
                        className="bg-slate-700 px-2 py-1 rounded"
                      >
                        <option>کم</option>
                        <option>متوسط</option>
                        <option>زیاد</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- تحلیل وضعیت موجود Section --- */}
          {activeSection === "تحلیل وضعیت موجود" && (
            <div className="space-y-10">
              {/* 1. شرح وضعیت فعلی */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  1. شرح وضعیت فعلی
                </h2>
                <textarea
                  className="w-full bg-slate-800 p-3 rounded"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                />
              </div>
              <hr className="border-slate-800" />
              {/* 2. داده ها و شواهد */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-4">
                  2. داده ها و شواهد
                </h2>
                <p className="text-sm mb-2 text-slate-400">متن شواهد</p>
                {evidenceTexts.map((t, i) => (
                  <input
                    key={i}
                    className="w-full bg-slate-800 p-2 rounded mb-2"
                    value={t}
                    onChange={(e) =>
                      updateList(
                        setEvidenceTexts,
                        evidenceTexts,
                        i,
                        e.target.value
                      )
                    }
                  />
                ))}
                <button
                  onClick={() => addItem(setEvidenceTexts, evidenceTexts)}
                  className="bg-slate-700 px-2 py-1 rounded mb-6"
                >
                  + متن
                </button>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-slate-400">نمودارها: سال / مقدار</p>
                  <button
                    onClick={addChartGroup}
                    className="bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    + نمودار جدید
                  </button>
                </div>
                <div className="space-y-8">
                  {chartGroups.map((chart, chartIndex) => (
                    <div
                      key={chartIndex}
                      className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                    >
                      <div className="flex gap-2 mb-4">
                        <input
                          className="bg-slate-900 p-2 rounded w-full"
                          placeholder={`عنوان نمودار ${chartIndex + 1}`}
                          value={chart.title}
                          onChange={(e) =>
                            updateChartTitle(chartIndex, e.target.value)
                          }
                        />
                        <button
                          onClick={() => removeChartGroup(chartIndex)}
                          className="bg-red-600 px-3 py-1 rounded text-sm disabled:opacity-40"
                          disabled={chartGroups.length === 1}
                        >
                          حذف
                        </button>
                      </div>
                      {chart.data.map((row, dataIndex) => (
                        <div key={dataIndex} className="flex gap-2 mb-2">
                          <input
                            className="bg-slate-900 p-2 rounded w-1/2"
                            placeholder="سال مثلا 1402"
                            value={row.x}
                            onChange={(e) =>
                              updateChartData(
                                chartIndex,
                                dataIndex,
                                "x",
                                e.target.value
                              )
                            }
                          />
                          <input
                            className="bg-slate-900 p-2 rounded w-1/2"
                            placeholder="مقدار مثلا 2"
                            value={row.y}
                            onChange={(e) =>
                              updateChartData(
                                chartIndex,
                                dataIndex,
                                "y",
                                e.target.value
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              removeChartDataRow(chartIndex, dataIndex)
                            }
                            className="bg-red-700 px-3 py-1 rounded text-sm disabled:opacity-40"
                            disabled={chart.data.length === 1}
                          >
                            -
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addChartDataRow(chartIndex)}
                        className="bg-slate-700 px-2 py-1 rounded mt-2"
                      >
                        + داده
                      </button>
                      <div className="bg-slate-900 p-4 rounded mt-6 overflow-x-auto">
                        <h3 className="text-sm text-slate-300 mb-4">
                          {chart.title || `نمودار ${chartIndex + 1}`}
                        </h3>
                        {renderLineChart(chart)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 3 تا 9 */}
              {[
                { title: "3. چالش های اصلی", state: challenges, set: setChallenges },
                { title: "4. نقاط قوت", state: strengths, set: setStrengths },
                { title: "5. نقاط ضعف", state: weaknesses, set: setWeaknesses },
                { title: "6. فرصت ها", state: opportunities, set: setOpportunities },
                { title: "7. تهدیدها", state: threats, set: setThreats },
                { title: "8. ذی نفعان", state: stakeholders, set: setStakeholders },
                { title: "9. منابع موجود", state: resources, set: setResources },
              ].map((section, i) => (
                <div
                  key={i}
                  className="bg-slate-900 p-6 rounded-xl border border-slate-800"
                >
                  <h2 className="text-blue-400 font-bold mb-3">
                    {section.title}
                  </h2>
                  {section.state.map((item: any, index: number) => (
                    <input
                      key={index}
                      className="w-full bg-slate-800 p-2 rounded mb-2"
                      value={item}
                      onChange={(e) =>
                        updateList(
                          section.set,
                          section.state,
                          index,
                          e.target.value
                        )
                      }
                    />
                  ))}
                  <button
                    onClick={() => addItem(section.set, section.state)}
                    className="bg-slate-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              ))}
              {/* 10. شکاف وضعیت */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  10. شکاف وضعیت موجود و مطلوب
                </h2>
                <textarea
                  className="w-full bg-slate-800 p-3 rounded"
                  value={gapAnalysis}
                  onChange={(e) => setGapAnalysis(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* --- استراتژی کلی Section --- */}
          {activeSection === "استراتژی کلی" && (
            <div className="space-y-10">
              {/* 1. جهت‌گیری راهبردی */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  1. جهت‌گیری راهبردی
                </h2>
                <textarea
                  className="w-full bg-slate-800 p-3 rounded"
                  placeholder="شرح رویکرد کلی برنامه..."
                  value={strategicDirection}
                  onChange={(e) => setStrategicDirection(e.target.value)}
                />
              </div>
              <hr className="border-slate-800" />
              {/* 2. استراتژی‌های کلیدی */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  2. استراتژی‌های کلیدی
                </h2>
                {keyStrategies.map((item, index) => (
                  <input
                    key={index}
                    className="w-full bg-slate-800 p-2 rounded mb-2"
                    placeholder={`استراتژی ${index + 1}`}
                    value={item}
                    onChange={(e) =>
                      updateList(setKeyStrategies, keyStrategies, index, e.target.value)
                    }
                  />
                ))}
                <button
                  onClick={() => addItem(setKeyStrategies, keyStrategies)}
                  className="bg-slate-700 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
              <hr className="border-slate-800" />
              {/* 3. منطق انتخاب استراتژی‌ها */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  3. منطق انتخاب استراتژی‌ها
                </h2>
                <textarea
                  className="w-full bg-slate-800 p-3 rounded"
                  placeholder="ارتباط استراتژی‌ها با تحلیل وضعیت موجود..."
                  value={strategyLogic}
                  onChange={(e) => setStrategyLogic(e.target.value)}
                />
              </div>
              <hr className="border-slate-800" />
              {/* 4. حوزه‌های تمرکز */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  4. حوزه‌های تمرکز
                </h2>
                {focusAreas.map((item, index) => (
                  <input
                    key={index}
                    className="w-full bg-slate-800 p-2 rounded mb-2"
                    placeholder={`حوزه ${index + 1}`}
                    value={item}
                    onChange={(e) =>
                      updateList(setFocusAreas, focusAreas, index, e.target.value)
                    }
                  />
                ))}
                <button
                  onClick={() => addItem(setFocusAreas, focusAreas)}
                  className="bg-slate-700 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
              <hr className="border-slate-800" />
              {/* 5. اولویت‌های استراتژیک */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  5. اولویت‌های استراتژیک
                </h2>
                {strategicPriorities.map((item, index) => (
                  <input
                    key={index}
                    className="w-full bg-slate-800 p-2 rounded mb-2"
                    placeholder={`اولویت ${index + 1}`}
                    value={item}
                    onChange={(e) =>
                      updateList(
                        setStrategicPriorities,
                        strategicPriorities,
                        index,
                        e.target.value
                      )
                    }
                  />
                ))}
                <button
                  onClick={() => addItem(setStrategicPriorities, strategicPriorities)}
                  className="bg-slate-700 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
              <hr className="border-slate-800" />
              {/* 6. نتایج مورد انتظار */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-blue-400 font-bold mb-3">
                  6. نتایج مورد انتظار
                </h2>
                {expectedResults.map((item, index) => (
                  <input
                    key={index}
                    className="w-full bg-slate-800 p-2 rounded mb-2"
                    placeholder={`نتیجه ${index + 1}`}
                    value={item}
                    onChange={(e) =>
                      updateList(
                        setExpectedResults,
                        expectedResults,
                        index,
                        e.target.value
                      )
                    }
                  />
                ))}
                <button
                  onClick={() => addItem(setExpectedResults, expectedResults)}
                  className="bg-slate-700 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* --- اقدامات Section --- */}
          {activeSection === "اقدامات" && (
            <div className="space-y-10">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-blue-400 font-bold text-lg">
                    جزئیات اقدامات
                  </h2>
                  <button
                    onClick={addAction}
                    className="bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    + اقدام جدید
                  </button>
                </div>
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-xs text-slate-400">
                      <th className="py-3 px-2">شماره</th>
                      <th className="py-3 px-2">شرح اقدام</th>
                      <th className="py-3 px-2">مسئول</th>
                      <th className="py-3 px-2">تاریخ شروع</th>
                      <th className="py-3 px-2">تاریخ پایان</th>
                      <th className="py-3 px-2">منابع</th>
                      <th className="py-3 px-2">خروجی</th>
                      <th className="py-3 px-2">معیار سنجش</th>
                      <th className="py-3 px-2">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((action, index) => (
                      <tr key={action.id} className="border-b border-slate-800">
                        <td className="py-3 px-2 text-sm">{index + 1}</td>
                        <td className="py-3 px-2">
                          <input
                            className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                            value={action.description}
                            onChange={(e) =>
                              updateAction(action.id, "description", e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                            value={action.owner}
                            onChange={(e) =>
                              updateAction(action.id, "owner", e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2">
                          <DatePicker
                            value={action.startDate}
                            onChange={(date: any) =>
                              updateAction(
                                action.id,
                                "startDate",
                                date ? date.format("YYYY/MM/DD") : ""
                              )
                            }
                            calendar={persian}
                            locale={persian_fa}
                            format="YYYY/MM/DD"
                            className="teal"
                            inputClass="bg-slate-800 border border-slate-700 rounded p-2 text-xs w-full text-white"
                            placeholder="انتخاب تاریخ"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <DatePicker
                            value={action.endDate}
                            onChange={(date: any) =>
                              updateAction(
                                action.id,
                                "endDate",
                                date ? date.format("YYYY/MM/DD") : ""
                              )
                            }
                            calendar={persian}
                            locale={persian_fa}
                            format="YYYY/MM/DD"
                            className="teal"
                            inputClass="bg-slate-800 border border-slate-700 rounded p-2 text-xs w-full text-white"
                            placeholder="انتخاب تاریخ"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                            value={action.resources}
                            onChange={(e) =>
                              updateAction(action.id, "resources", e.target.value)
                            }
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                            value={action.expectedOutput}
                            onChange={(e) =>
                              updateAction(
                                action.id,
                                "expectedOutput",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                            value={action.measurementCriteria}
                            onChange={(e) =>
                              updateAction(
                                action.id,
                                "measurementCriteria",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="py-3 px-2">
                          <select
                            value={action.status}
                            onChange={(e) =>
                              updateAction(action.id, "status", e.target.value)
                            }
                            className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          >
                            <option>در انتظار</option>
                            <option>در حال انجام</option>
                            <option>تکمیل شده</option>
                            <option>لغو شده</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- مسئولیت ها Section --- */}
          {activeSection === "مسئولیت ها" && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-blue-400 font-bold text-lg">
                  تعیین مسئولیت‌ها
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={addResponsibilityRow}
                    className="bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    + ردیف اقدام
                  </button>
                  <button
                    onClick={addUnit}
                    className="bg-teal-600 px-3 py-1 rounded text-sm"
                  >
                    + واحد جدید
                  </button>
                </div>
              </div>
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-xs text-slate-400">
                    <th className="py-3 px-2 min-w-[200px]">اقدام</th>
                    {allUnits.map((unit) => (
                      <th key={unit} className="py-3 px-2 min-w-[100px] text-center">
                        {unit}
                      </th>
                    ))}
                    <th className="py-3 px-2 min-w-[50px]"></th> {/* for delete button */}
                  </tr>
                </thead>
                <tbody>
                  {responsibilities.map((resp) => (
                    <tr key={resp.id} className="border-b border-slate-800">
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={resp.action}
                          onChange={(e) =>
                            updateResponsibilityAction(resp.id, e.target.value)
                          }
                          placeholder="شرح اقدام..."
                        />
                      </td>
                      {allUnits.map((unit) => (
                        <td key={unit} className="py-3 px-2 text-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded"
                            checked={resp.unitAssignments[unit] || false}
                            onChange={() => toggleUnitAssignment(resp.id, unit)}
                          />
                        </td>
                      ))}
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => removeResponsibilityRow(resp.id)}
                          className="bg-red-600 px-2 py-1 rounded text-xs disabled:opacity-40"
                          disabled={responsibilities.length === 1}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* --- زمان بندی Section --- */}
          {activeSection === "زمان بندی" && (
            <div className="space-y-10">
              <div className="flex justify-end mb-4">
                <button
                  onClick={addSchedulePhase}
                  className="bg-blue-600 px-3 py-1 rounded text-sm"
                >
                  + فاز جدید
                </button>
              </div>
              {schedulePhases.map((phase) => (
                <div
                  key={phase.id}
                  className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-blue-400">
                      {phase.phaseTitle}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addMilestone(phase.id)}
                        className="bg-blue-600 px-3 py-1 rounded text-sm"
                      >
                        + نقطه عطف
                      </button>
                      <button
                        onClick={() => removePhase(phase.id)}
                        className="bg-red-600 px-3 py-1 rounded text-sm disabled:opacity-40"
                        disabled={schedulePhases.length === 1}
                      >
                        حذف فاز
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                      <thead>
                        <tr className="border-b border-slate-700 text-xs text-slate-400">
                          <th className="py-3 px-2 min-w-[200px]">اقدام / نقطه عطف</th>
                          <th className="py-3 px-2 min-w-[150px]">مسئول</th>
                          <th className="py-3 px-2 min-w-[120px]">تاریخ شروع</th>
                          <th className="py-3 px-2 min-w-[120px]">تاریخ پایان</th>
                          <th className="py-3 px-2 min-w-[80px]">مدت زمان (روز)</th>
                          <th className="py-3 px-2 min-w-[100px]">وضعیت</th>
                          <th className="py-3 px-2 min-w-[50px]"></th> {/* for delete button */}
                        </tr>
                      </thead>
                      <tbody>
                        {phase.milestones.map((ms) => (
                          <tr key={ms.id} className="border-b border-slate-800">
                            <td className="py-3 px-2">
                              <input
                                type="text"
                                className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                                value={ms.action}
                                onChange={(e) =>
                                  updateMilestone(
                                    phase.id,
                                    ms.id,
                                    "action",
                                    e.target.value
                                  )
                                }
                                placeholder="شرح اقدام..."
                              />
                            </td>
                            <td className="py-3 px-2">
                              <select
                                className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                                value={ms.owner}
                                onChange={(e) =>
                                  updateMilestone(
                                    phase.id,
                                    ms.id,
                                    "owner",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">انتخاب مسئول</option>
                                {allUnits.map((unit) => (
                                  <option key={unit} value={unit}>
                                    {unit}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-2">
                              <DatePicker
                                value={ms.startDate}
                                onChange={(date: any) => {
                                  const newStartDate = date
                                    ? date.format("YYYY/MM/DD")
                                    : "";
                                  updateMilestone(
                                    phase.id,
                                    ms.id,
                                    "startDate",
                                    newStartDate
                                  );
                                  // Recalculate duration if end date exists
                                  if (ms.endDate) {
                                    const duration = getDurationInDays(
                                      newStartDate,
                                      ms.endDate
                                    );
                                    updateMilestone(
                                      phase.id,
                                      ms.id,
                                      "duration",
                                      duration
                                    );
                                  }
                                }}
                                calendar={persian}
                                locale={persian_fa}
                                format="YYYY/MM/DD"
                                className="teal"
                                inputClass="bg-slate-800 border border-slate-700 rounded p-2 text-xs w-full text-white"
                                placeholder="تاریخ شروع"
                              />
                            </td>
                            <td className="py-3 px-2">
                              <DatePicker
                                value={ms.endDate}
                                onChange={(date: any) => {
                                  const newEndDate = date
                                    ? date.format("YYYY/MM/DD")
                                    : "";
                                  updateMilestone(
                                    phase.id,
                                    ms.id,
                                    "endDate",
                                    newEndDate
                                  );
                                  // Recalculate duration if start date exists
                                  if (ms.startDate) {
                                    const duration = getDurationInDays(
                                      ms.startDate,
                                      newEndDate
                                    );
                                    updateMilestone(
                                      phase.id,
                                      ms.id,
                                      "duration",
                                      duration
                                    );
                                  }
                                }}
                                calendar={persian}
                                locale={persian_fa}
                                format="YYYY/MM/DD"
                                className="teal"
                                inputClass="bg-slate-800 border border-slate-700 rounded p-2 text-xs w-full text-white"
                                placeholder="تاریخ پایان"
                              />
                            </td>
                            <td className="py-3 px-2 text-center">
                              {ms.duration}
                            </td>
                            <td className="py-3 px-2">
                              <select
                                value={ms.status}
                                onChange={(e) =>
                                  updateMilestone(
                                    phase.id,
                                    ms.id,
                                    "status",
                                    e.target.value
                                  )
                                }
                                className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                              >
                                <option>در انتظار</option>
                                <option>در حال انجام</option>
                                <option>تکمیل شده</option>
                                <option>لغو شده</option>
                              </select>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <button
                                onClick={() => removeMilestone(phase.id, ms.id)}
                                className="bg-red-600 px-2 py-1 rounded text-xs disabled:opacity-40"
                                disabled={phase.milestones.length === 1}
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- شاخص های عملکرد Section --- */}
          {activeSection === "شاخص های عملکرد" && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-blue-400 font-bold text-lg">
                  شاخص های عملکرد (KPI)
                </h2>
                <button
                  onClick={addKpiMetric}
                  className="bg-blue-600 px-3 py-1 rounded text-sm"
                >
                  + شاخص جدید
                </button>
              </div>
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-xs text-slate-400">
                    <th className="py-3 px-2 min-w-[150px]">هدف مرتبط</th>
                    <th className="py-3 px-2 min-w-[180px]">شاخص عملکرد (KPI)</th>
                    <th className="py-3 px-2 min-w-[120px]">خط مبنا (Baseline)</th>
                    <th className="py-3 px-2 min-w-[120px]">هدف کمی (Target)</th>
                    <th className="py-3 px-2 min-w-[180px]">روش اندازه‌گیری</th>
                    <th className="py-3 px-2 min-w-[120px]">فرکانس اندازه‌گیری</th>
                    <th className="py-3 px-2 min-w-[150px]">مسئول اندازه‌گیری</th>
                    <th className="py-3 px-2 min-w-[50px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {kpiMetrics.map((kpi) => (
                    <tr key={kpi.id} className="border-b border-slate-800">
                      <td className="py-3 px-2">
                        <select
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={kpi.relatedGoal}
                          onChange={(e) =>
                            updateKpiMetric(kpi.id, "relatedGoal", e.target.value)
                          }
                        >
                          <option value="">انتخاب هدف</option>
                          {objectives.map((obj) => (
                            <option key={obj.id} value={obj.title}>
                              {obj.title || "بدون عنوان"}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={kpi.kpiName}
                          onChange={(e) =>
                            updateKpiMetric(kpi.id, "kpiName", e.target.value)
                          }
                          placeholder="مثلا نرخ رضایت مشتری"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={kpi.baseline}
                          onChange={(e) =>
                            updateKpiMetric(kpi.id, "baseline", e.target.value)
                          }
                          placeholder="وضعیت فعلی"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={kpi.target}
                          onChange={(e) =>
                            updateKpiMetric(kpi.id, "target", e.target.value)
                          }
                          placeholder="مقدار هدف"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={kpi.measurementMethod}
                          onChange={(e) =>
                            updateKpiMetric(
                              kpi.id,
                              "measurementMethod",
                              e.target.value
                            )
                          }
                          placeholder="مثلا نظرسنجی، گزارش سیستم..."
                        />
                      </td>
                      <td className="py-3 px-2">
                        <select
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={kpi.frequency}
                          onChange={(e) =>
                            updateKpiMetric(kpi.id, "frequency", e.target.value)
                          }
                        >
                          <option>روزانه</option>
                          <option>هفتگی</option>
                          <option>ماهانه</option>
                          <option>فصلی</option>
                          <option>سالانه</option>
                        </select>
                      </td>
                      <td className="py-3 px-2">
                        <select
                          className="bg-slate-800 border border-slate-700 rounded p-2 w-full text-sm"
                          value={kpi.responsibleUnit}
                          onChange={(e) =>
                            updateKpiMetric(
                              kpi.id,
                              "responsibleUnit",
                              e.target.value
                            )
                          }
                        >
                          <option value="">انتخاب مسئول</option>
                          {allUnits.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => removeKpiMetric(kpi.id)}
                          className="bg-red-600 px-2 py-1 rounded text-xs disabled:opacity-40"
                          disabled={kpiMetrics.length === 1}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* ====================== گزارش های نهایی ====================== */}
          {activeSection === "گزارش های نهایی" && (
            <div className="space-y-12" dir="rtl">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-400">گزارش نهایی پروژه</h1>
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
                >
                  🖨️ چاپ / ذخیره به PDF
                </button>
              </div>

              {/* 1. خلاصه اجرایی */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-4">
                  ۱. خلاصه اجرایی
                </h2>
                <p className="text-lg leading-relaxed text-slate-200">
                  {goal || "هدف کلی هنوز وارد نشده است."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400">{objectives.length}</div>
                    <div className="text-slate-400 mt-1">هدف جزئی</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400">{actions.length}</div>
                    <div className="text-slate-400 mt-1">اقدام</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400">{schedulePhases.length}</div>
                    <div className="text-slate-400 mt-1">فاز زمانی</div>
                  </div>
                </div>
              </div>

              {/* 2. اهداف و KPIها */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">۲. اهداف و شاخص‌های عملکرد</h2>
                <div className="space-y-8">
                  {objectives.map((obj, idx) => (
                    <div key={obj.id} className="border border-slate-700 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-3">هدف {idx + 1}: {obj.title || "بدون عنوان"}</h3>
                      <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                        <div><span className="text-slate-400">اولویت:</span> {obj.priority}</div>
                        <div><span className="text-slate-400">شروع:</span> {obj.startDate || "-"}</div>
                        <div><span className="text-slate-400">پایان:</span> {obj.endDate || "-"}</div>
                      </div>
                      {obj.kpis.some(k => k.trim()) && (
                        <div className="mt-4">
                          <p className="text-slate-400 mb-2">KPIها:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {obj.kpis.filter(k => k.trim()).map((kpi, i) => (
                              <li key={i}>{kpi}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. تحلیل وضعیت موجود */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">۳. تحلیل وضعیت موجود</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[
                    { title: "چالش‌ها", items: challenges },
                    { title: "نقاط قوت", items: strengths },
                    { title: "فرصت‌ها", items: opportunities },
                    { title: "تهدیدها", items: threats },
                  ].map((sec, i) => (
                    <div key={i}>
                      <h3 className="font-bold mb-3 text-blue-300">{sec.title}</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                        {sec.items.filter(Boolean).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {gapAnalysis && (
                  <div className="mt-10 pt-6 border-t border-slate-700">
                    <h3 className="font-bold mb-3 text-blue-300">شکاف وضعیت موجود و مطلوب</h3>
                    <p className="text-slate-300 leading-relaxed">{gapAnalysis}</p>
                  </div>
                )}
              </div>

              {/* 4. استراتژی کلی */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">۴. استراتژی کلی</h2>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {strategicDirection || "استراتژی هنوز وارد نشده است."}
                </p>
                {keyStrategies.some(s => s.trim()) && (
                  <div className="mt-8">
                    <h3 className="font-bold mb-4 text-blue-300">استراتژی‌های کلیدی</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                      {keyStrategies.filter(Boolean).map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              {/* 5. برنامه اقدامات */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 overflow-x-auto">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">۵. برنامه اقدامات</h2>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="p-4 border border-slate-700 text-right">شرح اقدام</th>
                      <th className="p-4 border border-slate-700">مسئول</th>
                      <th className="p-4 border border-slate-700">شروع</th>
                      <th className="p-4 border border-slate-700">پایان</th>
                      <th className="p-4 border border-slate-700">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((action) => (
                      <tr key={action.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                        <td className="p-4 border border-slate-700">{action.description || "-"}</td>
                        <td className="p-4 border border-slate-700">{action.owner || "-"}</td>
                        <td className="p-4 border border-slate-700">{action.startDate || "-"}</td>
                        <td className="p-4 border border-slate-700">{action.endDate || "-"}</td>
                        <td className="p-4 border border-slate-700 font-medium">{action.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 6. ماتریس مسئولیت‌ها */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 overflow-x-auto">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">۶. ماتریس مسئولیت‌ها</h2>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="p-4 border border-slate-700 text-right">اقدام</th>
                      {allUnits.map(unit => (
                        <th key={unit} className="p-4 border border-slate-700 text-center min-w-[100px]">{unit}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {responsibilities.map(resp => (
                      <tr key={resp.id} className="border-b border-slate-700">
                        <td className="p-4 border border-slate-700 font-medium">{resp.action || "-"}</td>
                        {allUnits.map(unit => (
                          <td key={unit} className="p-4 border border-slate-700 text-center">
                            {resp.unitAssignments[unit] ? "✅" : "–"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 7. زمان‌بندی */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">۷. زمان‌بندی پروژه</h2>
                {schedulePhases.map(phase => (
                  <div key={phase.id} className="mb-12">
                    <h3 className="text-xl font-bold mb-4 text-blue-300">{phase.phaseTitle}</h3>
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-800">
                          <th className="p-4 border">اقدام / نقطه عطف</th>
                          <th className="p-4 border">مسئول</th>
                          <th className="p-4 border">شروع</th>
                          <th className="p-4 border">پایان</th>
                          <th className="p-4 border">مدت (روز)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {phase.milestones.map(ms => (
                          <tr key={ms.id} className="border-b border-slate-700">
                            <td className="p-4 border">{ms.action || "-"}</td>
                            <td className="p-4 border">{ms.owner || "-"}</td>
                            <td className="p-4 border">{ms.startDate || "-"}</td>
                            <td className="p-4 border">{ms.endDate || "-"}</td>
                            <td className="p-4 border text-center font-mono">{ms.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* 8. شاخص‌های عملکرد */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">۸. داشبورد شاخص‌های عملکرد (KPI)</h2>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="p-4 border text-right">KPI</th>
                      <th className="p-4 border">خط مبنا</th>
                      <th className="p-4 border">هدف</th>
                      <th className="p-4 border">فرکانس</th>
                      <th className="p-4 border">مسئول</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiMetrics.map(kpi => (
                      <tr key={kpi.id} className="border-b border-slate-700">
                        <td className="p-4 border">{kpi.kpiName || "-"}</td>
                        <td className="p-4 border">{kpi.baseline || "-"}</td>
                        <td className="p-4 border font-medium text-green-400">{kpi.target || "-"}</td>
                        <td className="p-4 border">{kpi.frequency}</td>
                        <td className="p-4 border">{kpi.responsibleUnit || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
                              {/* ====================== بوم کسب و کار ====================== */}
          {activeSection === "بوم کسب و کار" && (
            <div className="space-y-8" dir="rtl">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-400">بوم کسب و کار (Business Model Canvas)</h1>
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
                >
                  🖨️ چاپ / ذخیره به PDF
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">
                <div className="grid grid-cols-5 gap-4">

                  {/* ردیف اول */}
                  <div className="col-span-1 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">شرکای کلیدی</div>
                    <textarea
                      className="w-full h-32 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.keyPartners}
                      onChange={(e) => updateBmc("keyPartners", e.target.value)}
                      placeholder="شرکا، تامین‌کنندگان، همکاران..."
                    />
                  </div>

                  <div className="col-span-1 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">فعالیت‌های کلیدی</div>
                    <textarea
                      className="w-full h-32 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.keyActivities}
                      onChange={(e) => updateBmc("keyActivities", e.target.value)}
                      placeholder="فعالیت‌های اصلی برای ارائه ارزش..."
                    />
                  </div>

                  <div className="col-span-1 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">ارزش‌های پیشنهادی</div>
                    <textarea
                      className="w-full h-32 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.valuePropositions}
                      onChange={(e) => updateBmc("valuePropositions", e.target.value)}
                      placeholder="ارزشی که برای مشتری ایجاد می‌کنید..."
                    />
                  </div>

                  <div className="col-span-1 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">ارتباط با مشتریان</div>
                    <textarea
                      className="w-full h-32 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.customerRelationships}
                      onChange={(e) => updateBmc("customerRelationships", e.target.value)}
                      placeholder="نوع رابطه با مشتری..."
                    />
                  </div>

                  <div className="col-span-1 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">بخش‌های مشتریان</div>
                    <textarea
                      className="w-full h-32 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.customerSegments}
                      onChange={(e) => updateBmc("customerSegments", e.target.value)}
                      placeholder="گروه‌های هدف مشتریان..."
                    />
                  </div>

                  {/* ردیف دوم */}
                  <div className="col-span-2 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">منابع کلیدی</div>
                    <textarea
                      className="w-full h-40 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.keyResources}
                      onChange={(e) => updateBmc("keyResources", e.target.value)}
                      placeholder="منابع فیزیکی، انسانی، مالی، فکری..."
                    />
                  </div>

                  <div className="col-span-1 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">کانال‌ها</div>
                    <textarea
                      className="w-full h-40 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.channels}
                      onChange={(e) => updateBmc("channels", e.target.value)}
                      placeholder="کانال‌های ارتباط و توزیع..."
                    />
                  </div>

                  {/* ردیف سوم */}
                  <div className="col-span-3 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">ساختار هزینه‌ها</div>
                    <textarea
                      className="w-full h-40 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.costStructure}
                      onChange={(e) => updateBmc("costStructure", e.target.value)}
                      placeholder="هزینه‌های ثابت و متغیر..."
                    />
                  </div>

                  <div className="col-span-2 border border-slate-600 rounded-2xl p-5 bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="text-blue-400 font-bold mb-3 text-sm">جریان‌های درآمدی</div>
                    <textarea
                      className="w-full h-40 bg-transparent border-0 focus:outline-none resize-none text-slate-200 placeholder-slate-500"
                      value={bmc.revenueStreams}
                      onChange={(e) => updateBmc("revenueStreams", e.target.value)}
                      placeholder="منابع درآمد و مدل قیمت‌گذاری..."
                    />
                  </div>

                </div>
              </div>

              <p className="text-center text-slate-500 text-sm">
                برای بهترین نتیجه چاپ، مرورگر را در حالت Landscape قرار دهید
              </p>
            </div>
          )}
                                      {/* Placeholder for other sections */}
          {activeSection !== "اهداف" &&
            activeSection !== "تحلیل وضعیت موجود" &&
            activeSection !== "استراتژی کلی" &&
            activeSection !== "اقدامات" &&
            activeSection !== "مسئولیت ها" &&
            activeSection !== "زمان بندی" &&
            activeSection !== "شاخص های عملکرد" &&
            activeSection !== "گزارش های نهایی" &&
            activeSection !== "بوم کسب و کار" && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400">
                این بخش هنوز طراحی نشده است
              </div>
            )}
        </div>
      </section>
    </main>
  );
}
