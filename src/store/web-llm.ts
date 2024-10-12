import { env } from "@/utils";
import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";
import { create } from "zustand";

interface LlmStore {
  engine: MLCEngine | null;
  status: {
    text: string;
    progress: number;
  };
  isLoaded: boolean;
}

export const useLlm = create<LlmStore>((set, get) => {
  const initializeEngine = async () => {
    if (get()?.engine) return;
    console.info("Initializing engine");
    set({
      status: {
        text: "Cargando...",
        progress: 0,
      },
    });
    try {
      const engine = await CreateMLCEngine(env.webLlmModel, {
        initProgressCallback: (initProgress) => {
          set({
            status: {
              text: initProgress.text,
              progress: initProgress.progress,
            },
          });
        },
      });
      set({ engine, isLoaded: true });
    } catch (error) {
      console.error(error);
      set({
        status: {
          text: "Error al cargar el modelo",
          progress: 0,
        },
        isLoaded: false,
      });
    }
  };

  initializeEngine();

  return {
    status: {
      text: "Cargando...",
      progress: 0,
    },
    engine: null,
    isLoaded: false,
  };
});
