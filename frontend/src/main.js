import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import WalletPassGenerator from './components/WalletPassGenerator';
import QRCodeGenerator from './components/QRCodeGenerator';
import AdminSettings from './components/AdminSettings';
import Tabs from './components/Tabs';

const App = () => {
    const [activeTab, setActiveTab] = useState('registration');

    return (
        <Router>
            <div>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <Switch>
                    <Route path='/registration'>
                        <RegistrationForm />
                    </Route>
                    <Route path='/wallet-pass'>
                        <WalletPassGenerator />
                    </Route>
                    <Route path='/qr-code'>
                        <QRCodeGenerator />
                    </Route>
                    <Route path='/admin-settings'>
                        <AdminSettings />
                    </Route>
                    <Route path='/'>
                        <h1>Welcome to the Salon Loyalty App</h1>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;