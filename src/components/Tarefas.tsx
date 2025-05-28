import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Tarefa } from "../models/tarefa.model";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { seletorTarefas, tarefaAdicionada, tarefaRemovida } from "../features/tarefa-slice";

const Tarefas: React.FC = () => {
  const [novaTarefa, setNovaTarefa] = useState("");
  const tarefas = useAppSelector(seletorTarefas);
  const dispatch = useAppDispatch();

  const adicionar = () => {
    if (novaTarefa.trim() !== "") {
      const tarefaObj: Tarefa = {
        id: uuidv4(),
        texto: novaTarefa,
        concluida: false,
      };
      dispatch(tarefaAdicionada(tarefaObj));
      setNovaTarefa("");
    }
  };

  const remover = (id: string) => {
    const tarefaParaRemover = tarefas.find((t) => t.id === id);
    if (tarefaParaRemover) {
      dispatch(tarefaRemovida(tarefaParaRemover));
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tarefas</h2>
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Nova tarefa"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={adicionar}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow transition"
          >
            Adicionar
          </button>
        </div>
        <ul className="space-y-4">
          {tarefas.map((tarefa: Tarefa) => (
            <li
              className="flex items-center justify-between bg-gray-100 rounded-md px-5 py-3 shadow hover:shadow-md transition"
              key={tarefa.id}
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-mono">{tarefa.id.substring(0, 4)}</span>
                <span className="text-lg text-gray-800 font-medium">{tarefa.texto}</span>
                <span className={`text-sm ${tarefa.concluida ? "text-green-600" : "text-red-500"}`}>
                  Concluída: {tarefa.concluida ? "Sim" : "Não"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => remover(tarefa.id)}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tarefas;

