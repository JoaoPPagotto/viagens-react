import { useState } from "react";

const PageVehicle = () => {
  const [dataList, setDataList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [inputData, setInputData] = useState({ type: "", plate: "" });
  const [updateData, setUpdateData] = useState({ id: "", type: "", plate: "", lat: "", lng: "", speed: "", status: "" });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSearchParam, setShowSearchParam] = useState(false);
  const [showDataList, setShowDataList] = useState(false);
  const [showDeleteParam, setShowDeleteParam] = useState(false);  // Adicionado para controlar a visibilidade do campo de ID para excluir

  // Função para buscar a lista de dados (GET sem parâmetros)
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/vehicles");

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
  const fetchDataWithParam = async () => {
    if (!searchParam) {
      alert("Por favor, insira um ID para buscar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/vehicles/${searchParam}`);

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

  // Método POST de cadastro
  const handleCreate = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const response = await fetch("http://localhost:3000/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (response.status !== 201) {
        throw new Error("Erro ao criar novo veículo");
      }

      const newVehicle = await response.json();
      setDataList((prevList) => [...prevList, newVehicle]);

      setInputData({ type: "", plate: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Erro ao criar novo veículo:", error);
    }
  };

  // Método PUT para atualizar dados completos
  const handleUpdateFull = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/vehicles/${updateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar veículo");
      }

      const updatedVehicle = await response.json();
      setDataList((prevList) =>
        prevList.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle))
      );

      setUpdateData({ id: "", type: "", plate: "", lat: "", lng: "", speed: "", status: "" });
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  // Método PATCH para atualização parcial
  const handleUpdatePartial = async (e) => {
    e.preventDefault();
    try {
      // Apenas as propriedades que estão no estado de updateData serão enviadas
      const patchData = {};
      for (let key in updateData) {
        if (updateData[key]) patchData[key] = updateData[key];
      }

      const response = await fetch(`http://localhost:3000/vehicles/${updateData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar veículo parcialmente");
      }

      const updatedVehicle = await response.json();
      setDataList((prevList) =>
        prevList.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle))
      );

      setUpdateData({ id: "", type: "", plate: "", lat: "", lng: "", speed: "", status: "" });
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
      const response = await fetch(`http://localhost:3000/vehicles/${updateData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir veículo");
      }

      // Atualiza a lista removendo o veículo excluído
      setDataList((prevList) => prevList.filter((vehicle) => vehicle.id !== updateData.id));

      setUpdateData({ id: "", type: "", plate: "", lat: "", lng: "", speed: "", status: "" });
      setShowDeleteParam(false);  // Fecha o campo de ID após a exclusão
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  };

  return (
    <div>
      <h1>Veiculos - CRUD</h1>

      {/* Botões CRUD */}
      <div>
        <button onClick={fetchData}>Consulta Geral</button>
        <button onClick={() => setShowSearchParam(true)}>Consulta Especifica</button> {/* Botão para mostrar campo de consulta */}
        <button onClick={() => setShowCreateForm(true)}>Cadastrar Veiculo</button> {/* Botão para mostrar campo de cadastro */}
        <button onClick={() => setShowUpdateForm(true)}>Atualizar Veiculo</button> {/* Botão para mostrar campo de update */}
        <button onClick={() => setShowDeleteParam(true)}>Excluir Veiculo</button> {/* Botão para mostrar campo de exclusão */}
      </div>

      {/* Caixa de Texto para o parâmetro de busca */}
      {showSearchParam && (
        <div>
          <h3>Buscar</h3>
          <input
            type="text"
            placeholder="Enter search parameter"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button onClick={fetchDataWithParam}>Buscar</button>
          <button onClick={() => setShowSearchParam(false)}>Cancelar</button>
        </div>
      )}

      {/* Formulário de Cadastro (POST) */}
      {showCreateForm && (
        <div>
          <h3>Cadastrar</h3>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Type"
              value={inputData.type}
              onChange={(e) => setInputData({ ...inputData, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Plate"
              value={inputData.plate}
              onChange={(e) => setInputData({ ...inputData, plate: e.target.value })}
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
              placeholder="Type"
              value={updateData.type}
              onChange={(e) => setUpdateData({ ...updateData, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Plate"
              value={updateData.plate}
              onChange={(e) => setUpdateData({ ...updateData, plate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Latitude"
              value={updateData.lat}
              onChange={(e) => setUpdateData({ ...updateData, lat: e.target.value })}
            />
            <input
              type="text"
              placeholder="Longitude"
              value={updateData.lng}
              onChange={(e) => setUpdateData({ ...updateData, lng: e.target.value })}
            />
            <input
              type="number"
              placeholder="Speed"
              value={updateData.speed}
              onChange={(e) => setUpdateData({ ...updateData, speed: e.target.value })}
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
              value={updateData.id}
              onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Type (optional)"
              value={updateData.type}
              onChange={(e) => setUpdateData({ ...updateData, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Plate (optional)"
              value={updateData.plate}
              onChange={(e) => setUpdateData({ ...updateData, plate: e.target.value })}
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
                    <strong>Type:</strong> {item.type} <br />
                    <strong>Plate:</strong> {item.plate} <br />
                    <strong>Status:</strong> {item.status} <br />
                    <strong>Speed:</strong> {item.speed} km/h <br />
                    <strong>Location:</strong> Lat {item.lat}, Lng {item.lng} <br />
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

export default PageVehicle;
