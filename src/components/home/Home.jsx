import React from 'react';
import Banner from './Banner';
import './home.css';

export const Home = () => {
  return (
    <main>
      <Banner />
      <div className='home'>
        <div className='headline'>
          <h1>Welcome To XenonStack</h1>
          <h5>Better Way To Start Shopping</h5>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae cupiditate adipisci quas. Quaerat, alias obcaecati cumque, dolores repudiandae iure repellat nemo earum voluptates exercitationem aperiam nulla odio tempora. Officia, hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae cupiditate adipisci quas. Quaerat, alias obcaecati cumque, dolores repudiandae iure repellat nemo earum voluptates exercitationem aperiam nulla odio tempora. Officia, hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae cupiditate adipisci quas. Quaerat, alias obcaecati cumque, dolores repudiandae iure repellat nemo earum voluptates exercitationem aperiam nulla odio tempora. Officia, hic!</p>
      </div>
    </main>
  )
}

export default Home;