import { useState } from "react";

const PageDriver = () => {
  const [dataList, setDataList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [inputData, setInputData] = useState({ name: "", cpf: "", cnh: ""});
  const [updateData, setUpdateData] = useState({ id: "", name: "", cpf: "", cnh: "", status: "" });
  const [partialUpdateData, setPartialUpdateData] = useState({ id: "", name: "", cpf: "", cnh: "", status: "" });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSearchParamId, setShowSearchParamId] = useState(false);
  const [showSearchParamStatus, setShowSearchParamStatus] = useState(false);
  const [showDataList, setShowDataList] = useState(false);
  const [showDeleteParam, setShowDeleteParam] = useState(false);  // Adicionado para controlar a visibilidade do campo de ID para excluir

  // Função para buscar a lista de dados (GET sem parâmetros)
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/drivers");

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

  // Função para buscar dados com um parâmetro (GET com parâmetro)
  const fetchDataWithParamId = async () => {
    if (!searchParam) {
      alert("Por favor, insira um ID para buscar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/drivers/${searchParam}`);

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

  const fetchDataWithParamStatus = async () => {
    if (!searchParam) {
      alert("Por favor, insira um Status para buscar.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/drivers/driversByStatus/${searchParam}`);
  
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
    try {
      const response = await fetch("http://localhost:3000/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (response.status !== 201) {
        throw new Error("Erro ao criar novo veículo");
      }

      const newDriver = await response.json();
      setDataList((prevList) => [...prevList, newDriver]);

      setInputData({ name: "", cpf: "", cnh: "", status: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Erro ao criar novo veículo:", error);
    }
  };

  // Método PUT para atualizar dados completos
  const handleUpdateFull = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/drivers/${updateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar veículo");
      }

      const updatedDriver = await response.json();
      setDataList((prevList) =>
        prevList.map((driver) => (driver.id === updatedDriver.id ? updatedDriver : driver))
      );

      setUpdateData({ id: "", name: "", cpf: "", cnh: "", status: "" });
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
  
      const response = await fetch(`http://localhost:3000/drivers/${partialUpdateData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar veículo parcialmente");
      }
  
      const updatedDriver = await response.json();
      setDataList((prevList) =>
        prevList.map((driver) => (driver.id === updatedDriver.id ? updatedDriver : driver))
      );
  
      setPartialUpdateData({ id: "", name: "", cpf: "", cnh: "", status: "" });
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
      const response = await fetch(`http://localhost:3000/drivers/${updateData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir veículo");
      }

      // Atualiza a lista removendo o veículo excluído
      setDataList((prevList) => prevList.filter((vehicle) => vehicle.id !== updateData.id));

      setUpdateData({ id: "", name: "", cpf: "", cnh: "", status: "" });
      setShowDeleteParam(false);  // Fecha o campo de ID após a exclusão
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  };

  return (
    <div>
      <h1>Motoristas - CRUD</h1>

      {/* Botões CRUD */}
      <div className="buttons">
        <button onClick={fetchData}>Consulta Geral</button>
        <button onClick={() => setShowSearchParamId(true)}>Consulta por ID</button> {/* Botão para mostrar campo de consulta */}
        <button onClick={() => setShowSearchParamStatus(true)}>Consulta por Status</button> {/* Botão para mostrar campo de consulta */}
        <button onClick={() => setShowCreateForm(true)}>Cadastrar Motorista</button> {/* Botão para mostrar campo de cadastro */}
        <button onClick={() => setShowUpdateForm(true)}>Atualizar Motorista</button> {/* Botão para mostrar campo de update */}
        <button onClick={() => setShowDeleteParam(true)}>Excluir Motorista</button> {/* Botão para mostrar campo de exclusão */}
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

      {/* Formulário de Cadastro (POST) */}
      {showCreateForm && (
        <div>
          <h3>Cadastrar</h3>
            <form onSubmit={handleCreate}>
              <input
               type="text"
               placeholder="Name"
               value={inputData.name}
                onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
             />
              <input
                type="text"
               placeholder="CPF"
               value={inputData.cpf}
                onChange={(e) => setInputData({ ...inputData, cpf: e.target.value })} // CORRETO
             />
             <input
                type="text"
               placeholder="CNH"
               value={inputData.cnh}
               onChange={(e) => setInputData({ ...inputData, cnh: e.target.value })} // CORRETO
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
              placeholder="Name"
              value={updateData.name}
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="CPF"
              value={updateData.cpf}
              onChange={(e) => setUpdateData({ ...updateData, cpf: e.target.value })}
            />
            <input
              type="text"
              placeholder="CNH"
              value={updateData.cnh}
              onChange={(e) => setUpdateData({ ...updateData, cnh: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status"
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
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
              placeholder="Name (optional)"
              value={partialUpdateData.name}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="CPF (optional)"
              value={partialUpdateData.cpf}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, cpf: e.target.value })}
            />
            <input
              type="text"
              placeholder="CNH (optional)"
              value={partialUpdateData.cnh}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, cnh: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status (optional)"
              value={partialUpdateData.status}
              onChange={(e) => setPartialUpdateData({ ...partialUpdateData, status: e.target.value })}
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
          <h2>Lista de Veiculos</h2>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ul>
              {dataList.length > 0 ? (
                dataList.map((item) => (
                  <li key={item.id}>
                    <strong>Id:</strong> {item.id} <br />
                    <strong>Name:</strong> {item.name} <br />
                    <strong>CPF:</strong> {item.cpf} <br />
                    <strong>CNH:</strong> {item.cnh} <br />
                    <strong>Status:</strong> {item.status} <br />
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

export default PageDriver;
