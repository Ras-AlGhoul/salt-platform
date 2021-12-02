import { useState, useEffect } from "react";
import NavPrivate from "../components/NavPrivate";
import Videos from "../components/Videos";
import Github from "../components/Github";
import Slides from "../components/Slides";
import styles from '../styles/pages.module.css';
import axios from "axios";

const labs = () => {
  const [slides, setSlides] = useState([]);
  const [videos, setVideos] = useState([]);
  const [githubLinks, setGithub] = useState([]);
  const [githubDescription, setGithubDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [slidesDescription, setSlidesDescription] = useState('');
  const [slidesLink, setSlidesLink] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [githubToggle, setGithubToggle] = useState(false);
  const [slidesToggle, setSlidesToggle] = useState(false);
  const [videosToggle, setVideosToggle] = useState(false);

  const fetchVideos = async () => {
    const res = await fetch('http://localhost:3000/api/videos')
    const allVideos = await res.json();
    setVideos(allVideos);
    return allVideos;
  };

  const fetchGithub = async () => {
    const res = await fetch('http://localhost:3000/api/github')
    const allGithub = await res.json();
    setGithub(allGithub);
    return allGithub;
  };

  const fetchSlides = async () => {
    const res = await fetch('http://localhost:3000/api/slides')
    const allSlides = await res.json();
    setSlides(allSlides);
    return allSlides;
  };

  useEffect(() => {
    fetchGithub();
    fetchSlides();
    fetchVideos();
    return () => {
    }
  }, []);

  const handleGithubFormSubmit = async (e) => {
    e.preventDefault();
    console.log(githubDescription, githubLink);
    const newRepo = {
      description: githubDescription,
      link: githubLink
    };
    await axios.post('http://localhost:3000/api/github', newRepo);
    fetchGithub();
    setGithubToggle(show => !show);
    setGithubLink('');
    setGithubDescription('');
  };

  const handleSlidesFormSubmit = async (e) => {
    e.preventDefault();
    console.log(slidesDescription, slidesLink);
    const newSlides = {
      description: slidesDescription,
      link: slidesLink
    };
    await axios.post('http://localhost:3000/api/slides', newSlides);
    fetchSlides();
    setSlidesToggle(show => !show);
    setSlidesLink('');
    setSlidesDescription('');
  };

  const handleVideosFormSubmit = async (e) => {
    e.preventDefault();
    console.log(videoDescription, videoLink);
    const newVideo = {
      description: slidesDescription,
      link: slidesLink
    };
    await axios.post('http://localhost:3000/api/videos', newVideo);
    fetchVideos();
    setVideosToggle(show => !show);
    setVideoLink('');
    setVideoDescription('');
  };

  return (
    <div className={styles.container}>
      <NavPrivate />

      <h2>Github</h2>
      {!githubToggle && (
        <button className={styles.button} onClick={() => setGithubToggle(show => !show)}>Add Repo</button>
      )}
      {githubToggle && (
        <form onSubmit={handleGithubFormSubmit}>
          <label><strong>Description: </strong></label>
          <input value={githubDescription} onChange={({ target: { value } }) => setGithubDescription(value)} />
          <label> <strong>Repo Link: </strong></label>
          <input value={githubLink} onChange={({ target: { value } }) => setGithubLink(value)} />
          <button className={styles.button} type='submit'>Add</button>
        </form>
      )}
      <div className={styles.icons}>
        {githubLinks.map((github, index) => <Github key={index} github={github} />)}
      </div>

      <h2>Slides</h2>
      {!slidesToggle && (
        <button className={styles.button} onClick={() => setSlidesToggle(show => !show)}>Add Slides</button>
      )}
      {slidesToggle && (
        <form onSubmit={handleSlidesFormSubmit}>
          <label><strong>Description: </strong></label>
          <input value={slidesDescription} onChange={({ target: { value } }) => setSlidesDescription(value)} />
          <label> <strong>Slides Link: </strong></label>
          <input value={slidesLink} onChange={({ target: { value } }) => setSlidesLink(value)} />
          <button className={styles.button} type='submit'>Add</button>
        </form>
      )}
      <div className={styles.icons}>
        {slides.map((slide, index) => <Slides key={index} slide={slide} />)}
      </div>

      <h2>Videos</h2>
      {!videosToggle && (
        <button className={styles.button} onClick={() => setVideosToggle(show => !show)}>Add Video</button>
      )}
      {videosToggle && (
        <form onSubmit={handleVideosFormSubmit}>
          <label><strong>Description: </strong></label>
          <input value={videoDescription} onChange={({ target: { value } }) => setVideoDescription(value)} />
          <label> <strong>Video Link: </strong></label>
          <input value={videoLink} onChange={({ target: { value } }) => setVideoLink(value)} />
          <button className={styles.button} type='submit'>Add</button>
        </form>
      )}
      <div className={styles.icons}>
        {videos.map((video, index) => <Videos key={index} video={video} />)}
      </div>
    </div>
  )
};

export default labs;
