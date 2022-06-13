import styled from "@emotion/styled"
import { motion } from "framer-motion"
import github from "../../images/github.png"

export const Socials = () => {
  const Container = styled.div`
    color: white;
    width: 99%;
    height: 70%;
    height: 5rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    text-transform: uppercase;
    justify-content: end;
    font-size: 15px;
    letter-spacing: 0px;
    display: flex;
  `

  const SocialsCont = styled.div`
    min-width: 75%;
    display: flex;
    flex-direction: column;
    z-index: 1;
  `

  return (
    <Container className="socialsContainer2">
      <SocialsCont className="socials">
        <>
          <motion.div
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              window.open("https://github.com/sandymandy12/BeatSuite")
            }}
            className="link"
          >
            <img className="githubLogo" src={github} alt="" />
          </motion.div>
        </>
      </SocialsCont>
    </Container>
  )
}

export default Socials
