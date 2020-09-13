import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default function MyModal({
    isOpen,
    onSave,
    onClose,
    isEdit,
    currentTransaction,
}) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            zIndex: '1000',
            minWidth: '400px',
        },
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        flexRadio: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        title: {
            fontSize: '18pt',
            fontWeight: 'bold',
        },
    };

    Modal.setAppElement('#root');

    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(isOpen);

    const openModal = () => {
        setIsOpen(true);
    };

    const afterOpenModal = () => {};

    const closeModal = () => {
        onClose(false);
        setIsOpen(false);
    };

    const currentDate = () => {
        const date = new Date();
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate()}`;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (description && value && category) {
            const data = {
                description,
                category,
                type,
                date,
            };
            console.log(data);
            onSave(data);
            closeModal();
        }
    };

    const [description, setDescription] = React.useState();
    const [category, setCategory] = React.useState();
    const [value, setValue] = React.useState();
    const [type, setType] = React.useState('-');
    const [date, setDate] = React.useState(currentDate);
    const [mode, setMode] = React.useState();

    const handleDescription = (event) => {
        const newItem = event.target.value;
        setDescription(newItem);
    };
    const handleCategory = (event) => {
        const newItem = event.target.value;
        setCategory(newItem);
    };
    const handleValue = (event) => {
        const newItem = event.target.value;
        setValue(newItem);
    };
    const handleType = (event) => {
        const newItem = event.target.value;
        setType(newItem);
    };
    const handleDate = (event) => {
        const newItem = event.target.value;
        setDate(newItem);
    };

    React.useEffect(() => {
        console.log('Mode: ' + (!!isEdit ? 'Edição' : 'Inserção'));
        if (!isEdit) {
            setMode('insert');
            return;
        }

        setMode('edit');
        const {
            description,
            category,
            value,
            type,
            date: yearMonthDay,
        } = currentTransaction.data;

        setDescription(description);
        setCategory(category);
        setValue(value);
        setType(type);
        setDate(date);
    }, [currentTransaction]);

    const title = !!isEdit ? 'Editar lançamento' : 'Novo Lançamento';

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={customStyles.flexRow}>
                    <h2
                        style={customStyles.title}
                        ref={(_subtitle) => (subtitle = _subtitle)}
                    >
                        {title}
                    </h2>
                    <i className="material-icons" onClick={closeModal}>
                        close
                    </i>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div style={customStyles.flexRadio}>
                            <p>
                                <label>
                                    <input
                                        name="type"
                                        type="radio"
                                        value="-"
                                        checked={type === '-'}
                                        disabled={mode === 'edit'}
                                        onChange={handleType}
                                    />
                                    <span>Despesa</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input
                                        name="type"
                                        type="radio"
                                        value="+"
                                        checked={type === '+'}
                                        disabled={mode === 'edit'}
                                        onChange={handleType}
                                    />
                                    <span>Receita</span>
                                </label>
                            </p>
                        </div>
                    </div>
                    <div className="input-field col s12">
                        <input
                            placeholder="Descrição"
                            id="description"
                            type="text"
                            value={description}
                            onChange={handleDescription}
                        />
                        <label htmlFor="description" className="active">
                            Descrição
                        </label>
                    </div>

                    <div className="input-field col s12">
                        <input
                            placeholder="Categoria"
                            id="category"
                            type="text"
                            value={category}
                            onChange={handleCategory}
                        />
                        <label htmlFor="category" className="active">
                            Categoria
                        </label>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="value"
                                type="number"
                                value={value}
                                onChange={handleValue}
                            />
                            <label htmlFor="value" className="active">
                                Valor
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={handleDate}
                            />
                            <label htmlFor="date" className="active">
                                Data
                            </label>
                        </div>
                        <input
                            type="submit"
                            className="waves-effect waves-light btn"
                            value="Salvar"
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}
