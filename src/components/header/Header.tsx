import './Header.scss'

export const Header = () => {
    return (
        <header className='Header'>
            <nav>
                <li><a href="/">Home</a></li>
                <li><a href="/employees">Employees</a></li>
                <li><a href="/tasks">Tasks</a></li>
            </nav>
        </header>
    )
}
