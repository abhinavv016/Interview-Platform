const PISTON_API = "https://emkc.org/api/v2/piston";


// 1. Added 'c' and 'c++' to supported types
export type SupportedLanguage = "javascript" | "python" | "java" | "c" | "cpp";

interface LanguageConfig {
  language: string;
  version: string;
}

// 2. Updated versions to include C (gcc) and C++ (g++)
const LANGUAGE_VERSIONS: Record<SupportedLanguage, LanguageConfig> = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
  c: { language: "c", version: "10.2.0" },
  cpp: { language: "c++", version: "10.2.0" },
};

interface PistonResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
}

export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

/**
 * Executes source code using the Piston API
 */
export async function executeCode(
  language: string, 
  code: string
): Promise<ExecutionResult> {
  try {
    const lang = language.toLowerCase() as SupportedLanguage;
    const languageConfig = LANGUAGE_VERSIONS[lang];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(lang)}`,
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data: PistonResponse = await response.json();

    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// 3. Added .c and .cpp extensions
function getFileExtension(language: SupportedLanguage): string {
  const extensions: Record<SupportedLanguage, string> = {
    javascript: "js",
    python: "py",
    java: "java",
    c: "c",
    cpp: "cpp",
  };

  return extensions[language] || "txt";
}