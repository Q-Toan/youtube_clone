import './SearchSuggestions.css';

const SearchSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="search-suggestions">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="suggestion-item" onClick={() => onSuggestionClick(suggestion)}>
          <p>{suggestion.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
