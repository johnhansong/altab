import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  // const sessionUser = useSelector((state) => state.session.user)

  return (
    <section className='nav-bar'>
        <div>
          <NavLink className='nav-link' to="/">
            <span className='app-title'>Altab</span>
            <ul className='app-title-deco'>
              <li id='green-dot'>⬤</li>
              <li id='yellow-dot'>⬤</li>
              <li id='red-dot'>⬤</li>
            </ul>
          </NavLink>
        </div>


        <div className="header-right">
          <NavLink className='header-link' to="/tags">
            Tags
          </NavLink>
          <NavLink className='header-link' to="/sites">
            Websites
          </NavLink>
          <ProfileButton />
        </div>
    </section>
  );
}

export default Navigation;
