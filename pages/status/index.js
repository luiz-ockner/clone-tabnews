import useSWR from "swr";

async function fetchAPI(key){
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage(){
   return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt(){
  const { isLoading,data} = useSWR("/api/v1/status",fetchAPI, {
    refreshInterval: 2000,
    dedupingInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if(!isLoading && data){
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour12: false,
    });
  }
  
  
  return <div>Última atualização: {updatedAtText}</div>
};

function DatabaseStatus(){
  const { isLoading,data} = useSWR("/api/v1/status",fetchAPI, {
    refreshInterval: 2000,
    dedupingInterval: 2000,
  });

  let databaseStatusText = "Carregando...";

  if(!isLoading && data){
    databaseStatusText = 
      <>
        <div> Versão: {data.dependencies.database.version}</div>
        <div> Máximo de conexões: {data.dependencies.database.max_conn}</div>
        <div> Conexões Abertas: {data.dependencies.database.opened_connections}</div>
     </>
  }
  
  return <div><h1>Banco de dados</h1> {databaseStatusText}</div>
}
