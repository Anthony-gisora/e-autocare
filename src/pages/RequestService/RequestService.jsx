import { useParams } from "react-router-dom";

const RequestService = () => {
  const param = useParams();
  const user = param.id;
  return <div>{user}</div>;
};

export default RequestService;
