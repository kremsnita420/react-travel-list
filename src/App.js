import { useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

export default function App() {
	const [items, setItems] = useState([]);
	// Handle adding items to list
	function handleAddItems(item) {
		setItems(items => [...items, item]);
	}

	// Handle deleting items from list
	function handleDeleteItem(id) {
		setItems(items => items.filter(item => item.id !== id));
	}

	// Handle toogle packed item
	function handleToggleItem(id) {
		setItems(items =>
			items.map(item =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	// Handle deleting items from list
	function handleDeleteList() {
		const confirmed = window.confirm(
			'Are you sure you want to delete all items?'
		);
		if (confirmed) setItems([]);
	}

	return (
		<div className='app'>
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				onToggleItems={handleToggleItem}
				onDeleteItem={handleDeleteItem}
				onDeleteList={handleDeleteList}
				items={items}
			/>
			<Stats items={items} />
		</div>
	);
}
