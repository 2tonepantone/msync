import React from "react"
import { Container, Image } from "react-bootstrap"
import music1 from "../images/music1.svg"
import music2 from "../images/music2.svg"
import music3 from "../images/music3.svg"

const IndexComponent = ({ pageType }) => {
  const text = { "home": "Search for an artist or track above to find similar ones!",
                "tracks": "You haven't saved any tracks yet!",
                "artists": "You haven't saved any artists yet!"
              }
  const images = { "home": music1, "tracks": music2, "artists": music3}
  return (
    <Container className='mt-5'>
      <h1 className="text-center">
        {text[pageType]}
      </h1>
      <div className="d-flex justify-content-center">
        <Image src={images[pageType]} fluid={true} />
      </div>
    </Container>
  )
}

export default IndexComponent
