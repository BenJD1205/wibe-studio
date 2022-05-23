import React, {useState} from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { useLocomotiveScroll } from "react-locomotive-scroll";

const NavbarContainer = styled(motion.div)`
    position: absolute;
    width:100vw;
    top:${props => props.click ? '0' : `-${props.theme.navHeight}`};
    z-index:6;

    display:flex;
    justify-content:center;
    align-items:center;
    transition:all 0.3s ease;
    @media (max-width: 40em) {
        top: ${(props) => (props.click ? "0" : `calc(-50vh - 4rem)`)};
    }
`
const MenuItems = styled(motion.ul)`
    position: relative;
    height:${props => props.theme.navHeight};
    background-color:${props => props.theme.body};
    color:${props => props.theme.text};
    list-style:none;
    display:flex;
    justify-content:space-around;
    align-items:center;
    width:100%;
    padding:0 10rem;
    @media (max-width: 40em) {
        flex-direction: column;
        padding: 2rem 0;
        height: 50vh;
    }
`

const MenuBtn = styled.li`
    background-color:${props => `rgba(${props.theme.textRgba}, 0.7)`};
    list-style-type:none;
    color:${props => props.theme.body};
    width:15rem;
    height:2.5rem;
    clip-path:polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:${props => props.theme.fontmd};
    font-weight:600;
    text-transform: uppercase;
    top:100%;
    left:50%;
    transform:translateX(-50%);
    position:absolute;

    @media (max-width: 40em) {
        width: 10rem;
        height: 2rem;
    }
`
const MenuItem = styled(motion.li)`
    text-transform: uppercase;
    color:${props => props.theme.text};
    cursor: pointer;

    @media (max-width: 40em) {
        flex-direction: column;
        padding: 0.5rem 0;
    }
`

const Navbar = () => {

    const [click, setClick] = useState(false)
    const { scroll } = useLocomotiveScroll();

    const handleScroll = (id) => {
        let elem = document.querySelector(id);
        setClick(!click);
        scroll.scrollTo(elem, {
          offset: "-100",
          duration: "2000",
          easing: [0.25, 0.0, 0.35, 1.0],
        });
      };

  return (
    <NavbarContainer 
        click={click}
        initial={{
            y:'-100%'
        }}
        animate={{
            y:0
        }}
        transition={{
            duration:2,
            delay:5
        }}
    >
        <MenuItems
            drag="y"
            dragConstraints={{
                top:0,
                bottom:70
            }}
            dragElastic={0.05}
            dragSnapToOrigin
        >
            <MenuBtn onClick={() => setClick(!click)}>Menu</MenuBtn>
            <MenuItem 
                whileTap={{scale:1.1,y:-5}} 
                whileHover={{scale:0.9,y:0}}
                onClick={() => handleScroll("#home")}
            >
                Home
            </MenuItem>
            <MenuItem 
                onClick={() => handleScroll(".about")}
                whileTap={{scale:1.1,y:-5}} 
                whileHover={{scale:0.9,y:0}}
            >
                About
            </MenuItem>
            <MenuItem 
                onClick={() => handleScroll("#shop")}
                whileTap={{scale:1.1,y:-5}} 
                whileHover={{scale:0.9,y:0}}
            >
                Shop
            </MenuItem>
            <MenuItem 
                whileTap={{scale:1.1,y:-5}} 
                whileHover={{scale:0.9,y:0}}
                onClick={() => handleScroll("#new-arrival")}
            >
                New Arrival
            </MenuItem>
        </MenuItems>
    </NavbarContainer>
  )
}

export default Navbar