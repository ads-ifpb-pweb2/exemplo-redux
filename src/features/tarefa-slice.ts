import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Tarefa } from "../models/tarefa.model";
import type { RootState } from "../store/store";

// Definição do tipo para o estado das tarefas
export interface TarefasState {
  tarefas: Tarefa[];
}

const estadoInicial: TarefasState = {
  tarefas: [],
};

export const tarefasSlice = createSlice({
  name: "planejamento",
  initialState: estadoInicial,
  reducers: {
    tarefaAdicionada: (state, action: PayloadAction<Tarefa>) => {
      state.tarefas.push(action.payload);
    },
    tarefaRemovida: (state, action) => {
      state.tarefas = state.tarefas.filter((tarefa) => tarefa.id !== action.payload.id);
    },
  },
});

export const { tarefaAdicionada, tarefaRemovida } = tarefasSlice.actions;
export default tarefasSlice.reducer;

export const seletorTarefas = (estado: RootState): Tarefa[] => estado.planejamento.tarefas;

export const seletorTarefaPorId = (estado: RootState, id: string): Tarefa | undefined =>
  estado.planejamento.tarefas.find((tarefa) => tarefa.id === id);

export const seletorTarefasPendentes = (estado: RootState): Tarefa[] =>
  estado.planejamento.tarefas.filter((tarefa) => !tarefa.concluida);
