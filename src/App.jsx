import { useState } from 'react';
import { Button, Form, Row, Col, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [reminders, setReminders] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!date.trim() || !description.trim()) {
      alert('Por favor ingrese fecha y descripción');
      return;
    }

    const newReminder = {
      date,
      description,
      important,
    };

    if (editIndex !== null) {
      const newReminders = [...reminders];
      newReminders[editIndex] = newReminder;
      setReminders(newReminders);
      setEditIndex(null);
    } else {
      setReminders([...reminders, newReminder]);
    }

    // Reset form fields
    setDate('');
    setDescription('');
    setImportant(false);
  };

  const handleDelete = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const handleEdit = (index) => {
    setDate(reminders[index].date);
    setDescription(reminders[index].description);
    setImportant(reminders[index].important);
    setEditIndex(index);
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" placeholder="Ingrese fecha" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control type="text" placeholder="Ingrese descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Importante" checked={important} onChange={(e) => setImportant(e.target.checked)} />
          </Form.Group>
          <Button type="submit">
            {editIndex !== null ? 'Actualizar Recordatorio' : 'Agregar Recordatorio'}
          </Button>
        </Form>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        {reminders.map((reminder, index) => (
          <Col key={index} sm={4} style={{ marginBottom: '15px' }}>
            <Card className="card-custom">
              <Card.Body>
                {reminder.important && (
                  <FontAwesomeIcon icon={faBell} className="card-icon" />
                )}
                <Card.Title>{reminder.date}</Card.Title>
                <Card.Text className="card-text">{reminder.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="danger" onClick={() => handleDelete(index)}>Eliminar</Button>
                <Button variant="warning" onClick={() => handleEdit(index)}>Modificar</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;


