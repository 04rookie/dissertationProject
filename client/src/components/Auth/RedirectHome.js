import { useHistory } from "react-router";

export default function RedirectHome(){
    const history = useHistory();
    history.push({pathname: "/home"})
}