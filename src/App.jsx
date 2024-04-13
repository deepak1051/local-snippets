import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SingleSnippetPage from './pages/SingleSnippetPage';
import CreateSnippet from './pages/CreateSnippet';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import EditSnippet from './pages/EditSnippet';

function App() {
  const [snippets, setSnippets] = useState(
    JSON.parse(localStorage.getItem('snippets')) || []
  );

  const createSnippet = (snippet) => {
    setSnippets([...snippets, snippet]);
  };

  const editSnippet = (snippet) => {
    setSnippets((prev) => prev.map((s) => (s.id === snippet.id ? snippet : s)));

    // setSnippets([...snippets, snippet]);
  };

  const deleteSnippet = (id) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage snippets={snippets} />} />
        <Route
          path="/snippets/:id"
          element={
            <SingleSnippetPage
              snippets={snippets}
              deleteSnippet={deleteSnippet}
            />
          }
        />
        <Route
          path="/snippets/new"
          element={
            <CreateSnippet snippets={snippets} createSnippet={createSnippet} />
          }
        />

        <Route
          path="/snippets/:id/edit"
          element={
            <EditSnippet snippets={snippets} editSnippet={editSnippet} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
