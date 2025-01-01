import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FormExample() {
  const [validated, setValidated] = useState(false);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [imageProfile, setImageProfile] = useState("");

const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract form data using the `event.target` object
   
    // Check if the form is valid
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    // Submit data to backend
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
          city,
          state,
          zip,
          imageProfile
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFirstname('');
      setLastname('');
      setUsername('');
      setEmail('');
      setPassword('');
      setCity('');
      setState('');
      setZip('');
      setImageProfile("");
      // Reset form fields and validation state
      router.push("/auth/login")
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Handle successful registration
      console.log('Registration successful');
      const data = await res.json();
      console.log(data);
      // Display success message or handle the response as needed
    } catch (error) {
      // Handle registration errors
      console.error(error);
    }

    // Reset validation state
    setValidated(false);
  };

  return (
    <div className='container'>
      <div className='main'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                isValid={validated}
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                isValid={validated}
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>


            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  isValid={validated}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>


          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City"  isValid={validated} 
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State"  isValid={validated}
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip"  isValid={validated} 
                onChange={(e) => setZip(e.target.value)}
                value={zip}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>

            
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" required isValid={validated} 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required isValid={validated} 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Image profile</Form.Label>
              <Form.Control type="text" placeholder="Image" required isValid={validated} 
                onChange={(e) => setImageProfile(e.target.value)}
                value={imageProfile}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>


          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </div>
  );
}

export default FormExample;