import Icon from './Icon';
export default function SectionHeading({ icon, subtitle, title }) { return <><span className="act-subtitle"><Icon name={icon} />{subtitle}</span><h2 className="act-title" data-split>{title}</h2></>; }
