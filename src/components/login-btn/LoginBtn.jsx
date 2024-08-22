import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


function LoginBtn(props) {

    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();

    return (
        <>

            {!isAuthenticated
                &&
                <Container className="homepage">
                        <Row className="d-flex justify-content-center">
                            <Button variant="primary" className="w-25 shadow1" onClick={loginWithRedirect({ "enabled_locales" : "it"})}>Accedi a MyWcag4All</Button>
                        </Row>
                </Container>
            }

        </>
    );
}
export default LoginBtn;