import React, { Component } from 'react';
import styled from 'styled-components';
import DisplacementSphere from '../components/DisplacementSphere';
import Intro from '../components/Intro';
import Project from '../components/Project';
import Profile from '../components/Profile';
import projectSpr from '../assets/project-spr.png';
import projectSprLarge from '../assets/project-spr-large.png';
import gamestackLogin from '../assets/gamestack-login.jpg';
import gamestackLoginLarge from '../assets/gamestack-login-large.jpg';
import gamestackList from '../assets/gamestack-list.jpg';
import gamestackListLarge from '../assets/gamestack-list-large.jpg';
const disciplines = ['Developer', 'Animator', 'Illustrator', 'Modder'];

export default class Home extends Component {
  state = {
    disciplineIndex: 0,
    hideScrollIndicator: false,
    visibleSections: [],
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const sphere = new DisplacementSphere(threeCanvas);
    requestAnimationFrame(() => sphere.init());
    this.switchDiscipline();
    window.addEventListener('scroll', this.handleScroll);
    this.setState({visibleSections: [this.intro]});
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    const revealSections = [this.intro, this.projectOne, this.projectTwo, this.details];
    const { visibleSections } = this.state;

    if (scrollY >= 50) {
      this.setState({hideScrollIndicator: true});
    } else {
      this.setState({hideScrollIndicator: false});
    }

    for (const section of revealSections) {
      const isVisible = visibleSections.includes(section);
      const showSection = this.isInViewport(section, scrollY) && !isVisible;
      if (showSection) {
        const sections = [...visibleSections, section];
        this.setState({visibleSections: sections});
      }
    };
  }

  isInViewport = (elem, scrollY) => {
    const bounding = elem.getBoundingClientRect();
    return bounding.top <= scrollY;
  };

  switchDiscipline = () => {
    setInterval(() => {
      const { disciplineIndex } = this.state;
      const index = disciplineIndex >= disciplines.length - 1 ? 0 : disciplineIndex + 1;

      this.setState({
        disciplineIndex: index,
      });
    }, 5000);
  }

  render() {
    const { disciplineIndex, hideScrollIndicator, visibleSections } = this.state;

    return (
      <HomeContainer>
        <Intro
          id="intro"
          sectionRef={section => this.intro = section}
          threeCanvas={canvas => this.threeCanvas = canvas}
          disciplines={disciplines}
          disciplineIndex={disciplineIndex}
          hideScrollIndicator={hideScrollIndicator}
        />
        <Project
          id="projects"
          sectionRef={section => this.projectOne = section}
          visible={visibleSections.includes(this.projectOne)}
          index="01"
          title="Designing the future of education"
          description="A description for this work example to prompt
          clicking a link to learn more"
          buttonText="View Project"
          imageSrc={[`${projectSpr} 1x, ${projectSprLarge} 2x`]}
          imageAlt={['Smart Sparrow lesson builder']}
          imageType="laptop"
        />
        <Project
          sectionRef={section => this.projectTwo = section}
          visible={visibleSections.includes(this.projectTwo)}
          index="02"
          title="Video game progress tracking"
          description="A description for this work example to prompt
          clicking a link to learn more"
          buttonText="View Website"
          buttonLink="https://www.gamestackapp.com"
          imageSrc={[
            `${gamestackLogin} 1x, ${gamestackLoginLarge} 2x`,
            `${gamestackList} 1x, ${gamestackListLarge} 2x`,
          ]}
          imageAlt={[
            'Smart Sparrow lesson author',
            'Smart Sparrow lesson author',
          ]}
          imageType="phone"
        />
        <Profile
          sectionRef={section => this.details = section}
          visible={visibleSections.includes(this.details)}
          id="details"
        />
      </HomeContainer>
    );
  }
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
