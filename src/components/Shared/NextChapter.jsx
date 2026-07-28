import Icon from './Icon';
import useCurtainNavigation from '../../hooks/useCurtainNavigation.jsx';

export default function NextChapter({ to, act, title, icon = 'ticket' }) {
  const { goTo } = useCurtainNavigation();

  return (
    <div className="next-chapter-wrapper">
      <button
        type="button"
        className="next-chapter-btn"
        onClick={() => goTo(to)}
        aria-label={`Navigate to ${title}`}
      >
        <Icon name={icon} className="next-chapter-icon" />
        <span className="next-chapter-text">
          {act ? `${act} — ` : ''}{title}
        </span>
      </button>
    </div>
  );
}
