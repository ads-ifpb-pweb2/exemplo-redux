import { createSlice } from "@reduxjs/toolkit";
import type { Tarefa } from "../models/tarefa.model";
import type { RootState } from "../store/store";

// Definição do tipo para o estado das tarefas
export interface TarefasState {
  tarefas: Tarefa[];
}

const estadoInicial: TarefasState = {
  tarefas: [] as Tarefa[],
};

export const tarefasSlice = createSlice({
  name: "tarefas",
  initialState: estadoInicial,
  reducers: {
    tarefaAdicionada: (state, action) => {
      state.tarefas.push(action.payload);
    },
    tarefaRemovida: (state, action) => {
      state.tarefas = state.tarefas.filter((tarefa) => tarefa.id !== action.payload.id);
    },
  },
});

export const { tarefaAdicionada, tarefaRemovida } = tarefasSlice.actions;
export default tarefasSlice.reducer;

export const seletorTarefas = (estado: RootState): Tarefa[] => estado.tarefas.tarefas;
