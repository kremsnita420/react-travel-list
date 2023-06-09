import { useState } from 'react';

const initialItems = [
	{ id: 1, description: 'Passports', quantity: 2, packed: true },
	{ id: 2, description: 'Socks', quantity: 12, packed: false },
];

export default function App() {
	const [items, setItems] = useState([]);

	// Handle adding items to list
	function handleAddItems(item) {
		setItems(items => [...items, item]);
	}

	return (
		<div className='app'>
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList items={items} />
			<Stats />
		</div>
	);
}

//! Logo component
function Logo() {
	return <h1>🏝️ Far Away 🧳</h1>;
}

//! Form component
function Form({ onAddItems }) {
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState(1);

	// Event handler
	function handleSubmit(e) {
		e.preventDefault();

		// Create new item
		if (!description) return;
		const newItem = { description, quantity, packed: false, id: Date.now() };
		console.log(newItem);

		onAddItems(newItem);

		// Reset form
		setDescription('');
		setQuantity(1);
	}

	return (
		<form className='add-form' onSubmit={handleSubmit}>
			<h3>What do you need for your 🥰 trip?</h3>
			<select
				value={quantity}
				onChange={e => setQuantity(Number(e.target.value))}
			>
				{/* Create array of options and map them */}
				{Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Item...'
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

//! List component
function PackingList({ items }) {
	return (
		<div className='list'>
			<ul>
				{items.map(item => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

//! List item component
function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
}

//! Footer component
function Stats() {
	return (
		<footer className='stats'>
			You have X items on your list, and you already packed X (X%)
		</footer>
	);
}
