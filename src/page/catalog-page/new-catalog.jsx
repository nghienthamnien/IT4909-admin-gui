import NewCatalog from '../../components/catalog/new-catalog';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';

export default function App() {
    setTitle('Create a new Catalog');
    return (
        <div
            className="page-content"
            style={{
                maxWidth: '800px',
                marginLeft: '256px',
            }}
        >
            <Heading title={'Create a new Catalog'} isBack={true}></Heading>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    paddingTop: '32px',
                }}
            >
                <NewCatalog />
            </div>
        </div>
    );
}
