// Basic React-like simulation for small assignment, without external libraries

function useState(initial) {
    let value = initial;
    let setter = function(newValue) {
        value = newValue;
        render();
    };
    return [() => value, setter];
}

const ContactContext = {
    contacts: [],
    setContacts: function(newContacts) {
        this.contacts = newContacts;
        render();
    }
};

function App() {
    const [getName, setName] = useState('');
    const [getPhone, setPhone] = useState('');
    const [getEmail, setEmail] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if(getName() && getPhone() && getEmail()) {
            ContactContext.setContacts([
                ...ContactContext.contacts,
                {
                    name: getName(),
                    phone: getPhone(),
                    email: getEmail()
                }
            ]);
            setName('');
            setPhone('');
            setEmail('');
        }
    }

    // Simulate useEffect for empty contacts
    if(ContactContext.contacts.length === 0) {
        // Effect if needed; right now nothing to clean up
    }

    return `
        <h2>Contact Card App</h2>
        <form id="contact-form">
            <input type="text" id="name" placeholder="Name" value="${getName()}" required/>
            <input type="text" id="phone" placeholder="Phone Number" value="${getPhone()}" required/>
            <input type="email" id="email" placeholder="Email" value="${getEmail()}" required/>
            <button type="submit">Add Contact</button>
        </form>
        <div>
            <h3>Contacts</h3>
            <div class="contact-list">
                ${ContactContext.contacts.map(contact => `
                    <div class="contact-card">
                        <strong>${contact.name}</strong>
                        <span>Phone: ${contact.phone}</span>
                        <span>Email: ${contact.email}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function render() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = App();

    // Add event handlers again after render
    document.getElementById('contact-form').onsubmit = function(event) {
        event.preventDefault();
        const nameVal = document.getElementById('name').value;
        const phoneVal = document.getElementById('phone').value;
        const emailVal = document.getElementById('email').value;
        ContactContext.setContacts([
            ...ContactContext.contacts,
            { name: nameVal, phone: phoneVal, email: emailVal }
        ]);
        render();
        // Clear form
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    };
}
render();