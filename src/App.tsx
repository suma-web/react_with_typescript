import { Header } from './components/Header/Header'
import type { User } from './types/user'

import 'bootstrap/dist/css/bootstrap.min.css';
import { UserManagement } from './components/UserManagement/UserManagement'

function App() {
  return (
    <>
      <Header />
      <UserManagement  />
    </>
  )
}

export default App
