import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Panel, Group, Separator } from "react-resizable-panels";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import { PROBLEMS } from "../data/problems";
import CodeEditorPanel from "../component/CodeEditorPanel";
import Navbar from "../component/navbar";
import OutputPanel from "../component/OutputPanel";
import ProblemDescription, { type Problem } from "../component/ProblemDescription";
import { type SupportedLanguage, type ExecutionResult, executeCode } from "../lib/piston";

interface ProblemData extends Problem {
  starterCode: Record<SupportedLanguage | string, string>;
  expectedOutput: Record<SupportedLanguage | string, string>;
}

const problemsData = PROBLEMS as Record<string, ProblemData>;

const ProblemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState<string>("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState<string>(problemsData["two-sum"].starterCode.javascript);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const currentProblem = problemsData[currentProblemId];

  useEffect(() => {
    if (id && problemsData[id]) {
      setCurrentProblemId(id);
      setCode(problemsData[id].starterCode[selectedLanguage] || "");
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguage;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang] || "");
    setOutput(null);
  };

  const handleProblemChange = (newProblemId: string) => navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    const defaults = { particleCount: 80, spread: 250, origin: { y: 0.6 } };
    confetti({ ...defaults, origin: { x: 0.2, y: 0.6 } });
    confetti({ ...defaults, origin: { x: 0.8, y: 0.6 } });
  };

  const normalizeOutput = (text: string): string => {
    return text.trim().split("\n").map(l => l.trim().replace(/\[\s+/g, "[").replace(/\s+\]/g, "]").replace(/\s*,\s*/g, ","))
      .filter(l => l.length > 0).join("\n");
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const result = await executeCode(selectedLanguage, code);
      setOutput(result);
      if (result.success && result.output) {
        const testsPassed = normalizeOutput(result.output) === normalizeOutput(currentProblem.expectedOutput[selectedLanguage]);
        if (testsPassed) { triggerConfetti(); toast.success("Tests passed!"); }
        else toast.error("Tests failed.");
      }
    } catch { toast.error("Execution error."); } finally { setIsRunning(false); }
  };

  return (
    <div className="h-screen bg-[#0a0d0a] flex flex-col overflow-hidden text-stone-100 grain">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal">
          <Panel defaultSize={40} minSize={30} className="flex flex-col border-r border-white/5">
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(problemsData)}
            />
          </Panel>
          <Separator className="w-1 bg-white/5 hover:bg-cyan-400/30 transition-colors cursor-col-resize" />
          <Panel defaultSize={60} minSize={30}>
            <Group orientation="vertical">
              <Panel defaultSize={70} minSize={20} className="flex flex-col">
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={(val) => setCode(val ?? "")}
                  onRunCode={handleRunCode}
                />
              </Panel>
              <Separator className="h-1 bg-white/5 hover:bg-cyan-400/30 transition-colors cursor-row-resize" />
              <Panel defaultSize={30} minSize={15} className="flex flex-col">
                <OutputPanel output={output} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
};

export default ProblemPage;