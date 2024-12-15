import { useState } from "react";

const PageTravel = () => {
  const [dataList, setDataList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [inputData, setInputData] = useState({ driverId: "", vehicleId: "", status: "", start: "", end: "" });
  const [updateData, setUpdateData] = useState({ id: "", driverId: "", vehicleId: "", status: "", start: "", end: ""  });
  const [partialUpdateData, setPartialUpdateData] = useState({ id: "", driverId: "", vehicleId: "", status: "", start: "", end: ""  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSearchParamId, setShowSearchParamId] = useState(false);
  const [showSearchParamStatus, setShowSearchParamStatus] = useState(false);
  const [showSearchParamDriverId, setShowSearchParamDriverId] = useState(false);
  const [showSearchParamVehicleId, setShowSearchParamVehicleId] = useState(false);
  const [showDataList, setShowDataList] = useState(false);
  const [showDeleteParam, setShowDeleteParam] = useState(false);  // Adicionado para controlar a visibilidade do campo de ID para excluir

  // Função para buscar a lista de dados (GET sem parâmetros)
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/travels");

      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const data = await response.json();
      setDataList(data);
      setShowDataList(true); // Mostrar a lista de dados
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Função para buscar dados com um parâmetro (GET por ID da viagem)
  const fetchDataWithParamId = async () => {
    if (!searchParam) {
      alert("Por favor, insira um ID para buscar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/travels/${searchParam}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar dados com parâmetro");
      }

      const data = await response.json();
      setDataList([data]); // Coloca o dado dentro de um array
      setShowDataList(true);
    } catch (error) {
      console.error("Erro ao buscar dados com parâmetro:", error);
    }
  };

  // Função para buscar dados com um parâmetro (GET por Status da viagem)
  const fetchDataWithParamStatus = async () => {
    if (!searchParam) {
      alert("Por favor, insira um Status para buscar.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/travels/travelsByStatus/${searchParam}`);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar dados com parâmetro");
      }
  
      const data = await response.json();
  
      // Diretamente define a lista de motoristas retornada
      setDataList(data);
      setShowDataList(true);
    } catch (error) {
      console.error("Erro ao buscar dados com parâmetro:", error);
    }
  };

  // Função para buscar dados com um parâmetro (GET por Id do motorista)
  const fetchDataWithParamDriverId = async () => {
    if (!searchParam) {
      alert("Por favor, insira um Status para buscar.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/travels/travelsByDriver/${searchParam}`);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar dados com parâmetro");
      }
  
      const data = await response.json();
  
      // Diretamente define a lista de motoristas retornada
      setDataList(data);
      setShowDataList(true);
    } catch (error) {
      console.error("Erro ao buscar dados com parâmetro:", error);
    }
  };

  // Função para buscar dados com um parâmetro (GET por Id do veiculo)
  const fetchDataWithParamVehicleId = async () => {
    if (!searchParam) {
      alert("Por favor, insira um Status para buscar.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/travels/travelsByVehicle/${searchParam}`);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar dados com parâmetro");
      }
  
      const data = await response.json();
  
      // Diretamente define a lista de motoristas retornada
      setDataList(data);
      setShowDataList(true);
    } catch (error) {
      console.error("Erro ao buscar dados com parâmetro:", error);
    }
  };


  // Método POST de cadastro
  const handleCreate = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    console.log("Dados do formulário", inputData); // Verifique se os dados estão corretos aqui
    try {
      const response = await fetch("http://localhost:3000/travels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
  
      if (response.status !== 201) {
        throw new Error("Erro ao criar novo veículo");
      }
  
      const newTravel = await response.json();
      setDataList((prevList) => [...prevList, newTravel]);
  
      setInputData({ driverId: "", vehicleId: "", status: "", start: "", end: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Erro ao criar novo veículo:", error);
    }
  };

  // Método PUT para atualizar dados completos
  const handleUpdateFull = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/travels/${updateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar veículo");
      }

      const updatedTravel = await response.json();
      setDataList((prevList) =>
        prevList.map((travel) => (travel.id === updatedTravel.id ? updatedTravel : travel))
      );

      setUpdateData({ id: "", driverId: "", vehicleId: "", status: "", start: "", end: "" });
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  // Método PATCH para atualização parcial
  const handleUpdatePartial = async (e) => {
    e.preventDefault();
    try {
      const patchData = {};
      for (let key in partialUpdateData) {
        if (partialUpdateData[key]) patchData[key] = partialUpdateData[key];
      }
  
      const response = await fetch(`http://localhost:3000/travels/${partialUpdateData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar veículo parcialmente");
      }
  
      const updatedTravel = await response.json();
      setDataList((prevList) =>
        prevList.map((travel) => (travel.id === updatedTravel.id ? updatedTravel : travel))
      );
  
      setPartialUpdateData({ id: "", driverId: "", vehicleId: "", status: "", start: "", end: "" });
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Erro ao atualizar veículo parcialmente:", error);
    }
  };
  

  // Função para deletar um veículo
  const handleDelete = async () => {
    if (!updateData.id) {
      alert("Por favor, insira um ID para excluir.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/travels/${updateData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir veículo");
      }

      // Atualiza a lista removendo o veículo excluído
      setDataList((prevList) => prevList.filter((vehicle) => vehicle.id !== updateData.id));

      setUpdateData({ id: "", driverId: "", vehicleId: "", status: "", start: "", end: "" });
      setShowDeleteParam(false);  // Fecha o campo de ID após a exclusão
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  };

  return (
    <div>
      <h1>Viagens - CRUD</h1>

      {/* Botões CRUD */}
      <div>
        <button onClick={fetchData}>Consulta Geral</button>
        <button onClick={() => setShowSearchParamId(true)}>Consulta por ID</button> {/* Botão para mostrar campo de consulta */}
        <button onClick={() => setShowSearchParamStatus(true)}>Consulta por Status</button> {/* Botão para mostrar campo de consulta */}
        <button onClick={() => setShowSearchParamDriverId(true)}>Consulta por motorista</button> {/* Botão para mostrar campo de consulta */}
        <button onClick={() => setShowSearchParamVehicleId(true)}>Consulta por Veiculo</button> {/* Botão para mostrar campo de consulta */}
        <button onClick={() => setShowCreateForm(true)}>Cadastrar Viagem</button> {/* Botão para mostrar campo de cadastro */}
        <button onClick={() => setShowUpdateForm(true)}>Atualizar Viagem</button> {/* Botão para mostrar campo de update */}
        <button onClick={() => setShowDeleteParam(true)}>Excluir Viagem</button> {/* Botão para mostrar campo de exclusão */}
      </div>

      {/* Caixa de Texto para o parâmetro de busca */}
      {showSearchParamId && (
        <div>
          <h3>Busca por ID</h3>
          <input
            type="text"
            placeholder="Enter search parameter"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button onClick={fetchDataWithParamId}>Buscar</button>
          <button onClick={() => setShowSearchParamId(false)}>Cancelar</button>
        </div>
      )}

      {/* Caixa de Texto para o parâmetro de busca */}
      {showSearchParamStatus && (
        <div>
          <h3>Busca por Status</h3>
          <input
            type="text"
            placeholder="Enter search parameter"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button onClick={fetchDataWithParamStatus}>Buscar</button>
          <button onClick={() => setShowSearchParamStatus(false)}>Cancelar</button>
        </div>
      )}

      {/* Caixa de Texto para o parâmetro de busca */}
      {showSearchParamDriverId && (
        <div>
          <h3>Busca por Id do Motorista</h3>
          <input
            type="text"
            placeholder="Enter search parameter"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button onClick={fetchDataWithParamDriverId}>Buscar</button>
          <button onClick={() => setShowSearchParamDriverId(false)}>Cancelar</button>
        </div>
      )}

      {/* Caixa de Texto para o parâmetro de busca */}
      {showSearchParamVehicleId && (
        <div>
          <h3>Busca por Id do Veiculo</h3>
          <input
            type="text"
            placeholder="Enter search parameter"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button onClick={fetchDataWithParamVehicleId}>Buscar</button>
          <button onClick={() => setShowSearchParamVehicleId(false)}>Cancelar</button>
        </div>
      )}

      {/* Formulário de Cadastro (POST) */}
      {showCreateForm && (
        <div>
          <h3>Cadastrar</h3>
            <form onSubmit={handleCreate}>
              <input
               type="text"
               placeholder="Id do Motorista"
               value={inputData.driverId}
                onChange={(e) => setInputData({ ...inputData, driverId: e.target.value })}
             />
              <input
                type="text"
               placeholder="Id do Veiculo"
               value={inputData.vehicleid}
                onChange={(e) => setInputData({ ...inputData, vehicleId: e.target.value })} 
             />
             <input
                type="text"
               placeholder="Status"
               value={inputData.status}
               onChange={(e) => setInputData({ ...inputData, status: e.target.value })} 
             />
             <input
                type="text"
               placeholder="Inicio"
               value={inputData.start}
               onChange={(e) => setInputData({ ...inputData, start: e.target.value })} 
             />
             <input
                type="text"
               placeholder="Fim"
               value={inputData.end}
               onChange={(e) => setInputData({ ...inputData, end: e.target.value })} 
             />
              <button type="submit">Cadastrar</button>
             <button type="button" onClick={() => setShowCreateForm(false)}>Cancelar</button>
            </form>
        </div>
      )}


      {/* Formulário de Atualização Completa (PUT) */}
      {showUpdateForm && (
        <div>
          <h3>Atualização (Completa)</h3>
          <form onSubmit={handleUpdateFull}>
           <input
              type="text"
              placeholder="ID"
              value={updateData.id}
              onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Id do motorista"
              value={updateData.driverId}
              onChange={(e) => setUpdateData({ ...updateData, driverId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Id do veiculo"
              value={updateData.vehicleId}
              onChange={(e) => setUpdateData({ ...updateData, vehicleId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status"
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
            />
            <input
              type="text"
              placeholder="Inicio"
              value={updateData.start}
              onChange={(e) => setUpdateData({ ...updateData, start: e.target.value })}
            />
            <input
              type="text"
              placeholder="Fim"
              value={updateData.end}
              onChange={(e) => setUpdateData({ ...updateData, end: e.target.value })}
            />
            <button type="submit">Atualizar</button>
            <button type="button" onClick={() => setShowUpdateForm(false)}>Cancelar</button>
          </form>

          {/* Formulário de Atualização Parcial (PATCH) */}
          <h3>Atualização (Parcial)</h3>
          <form onSubmit={handleUpdatePartial}>
            <input
              type="text"
              placeholder="ID"
              value={partialUpdateData.id}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Id do Motorista (optional)"
              value={partialUpdateData.driverId}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, driverId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Id do Veiculo (optional)"
              value={partialUpdateData.vehicleId}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, vehicleId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status (optional)"
              value={partialUpdateData.status}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, status: e.target.value })}
            />
            <input
              type="text"
              placeholder="Inicio (optional)"
              value={partialUpdateData.start}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, start: e.target.value })}
            />
            <input
              type="text"
              placeholder="Fim (optional)"
              value={partialUpdateData.end}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, end: e.target.value })}
            />
            <button type="submit">Atualizar </button>
            <button type="button" onClick={() => setShowUpdateForm(false)}>Cancelar</button>
          </form>
        </div>
      )}

      {/* Campo de Exclusão */}
      {showDeleteParam && (
        <div>
          <h3>Exclusão</h3>
          <input
            type="text"
            placeholder="Enter ID to delete"
            value={updateData.id}
            onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
          />
          <button onClick={handleDelete}>Excluir</button>
          <button type="button" onClick={() => setShowDeleteParam(false)}>Cancelar</button>
        </div>
      )}

      {/* Exibição da lista de dados */}
      {showDataList && (
        <div>
          <h2>Lista de Viagens</h2>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ul>
              {dataList.length > 0 ? (
                dataList.map((item) => (
                  <li key={item.id}>
                    <strong>Id:</strong> {item.id} <br />
                    <strong>Id do Motorista:</strong> {item.driverId} <br />
                    <strong>Id do Veiculo:</strong> {item.vehicleId} <br />
                    <strong>Status:</strong> {item.status} <br />
                    <strong>Inicio:</strong> {new Date(item.start).toLocaleDateString("pt-BR")} <br />
                    <strong>Fim:</strong> {new Date(item.end).toLocaleDateString("pt-BR")} <br />
                    {/* O botão de exclusão agora está oculto e funciona com ID */}
                  </li>
                ))
              ) : (
                <p>No data found</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTravel;
