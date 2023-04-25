import { Header } from "./components/common/Header";
import "./App.css";
import { Footer } from "./components/common/Footer";
import { Search } from "./components/search/Search";
import { UserSection } from "./components/userSection/UserSection";

function App() {
    return (
        <div>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />
                    <UserSection />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default App;
