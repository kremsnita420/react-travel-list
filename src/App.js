import { useState } from 'react';

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
function PackingList({ items, onDeleteItem, onToggleItems, onDeleteList }) {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;

	if (sortBy === 'description')
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));

	if (sortBy === 'packed')
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));
	return (
		<div className='list'>
			<ul>
				{sortedItems.map(item => (
					<Item
						item={item}
						onDeleteItem={onDeleteItem}
						onToggleItems={onToggleItems}
						key={item.id}
					/>
				))}
			</ul>

			<div className='actions'>
				<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
					<option value='input'>Sort by input order</option>
					<option value='description'>Sort by description</option>
					<option value='packed'>Sort by packed status</option>
				</select>
				<button onClick={onDeleteList}>Clear list</button>
			</div>
		</div>
	);
}

//! List item component
function Item({ item, onDeleteItem, onToggleItems }) {
	return (
		<li>
			<input
				type='checkbox'
				value={item.packed}
				onChange={() => onToggleItems(item.id)}
			/>
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.quantity}x {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

//! Footer component
function Stats({ items }) {
	if (!items.length)
		return (
			<p className='stats'>
				<em>Start adding items to your packing list 🚀</em>
			</p>
		);

	const numItems = items.length;
	const numPacked = items.filter(item => item.packed).length;
	const percentage = Math.round((numPacked / numItems) * 100);

	return (
		<footer className='stats'>
			<em>
				{percentage === 100
					? 'You packed everything on the list! Ready to go  ✈️'
					: `🧳 You have ${numItems} items on your list, and you already packed
				${numPacked} ${
							numPacked > 1 || numPacked === 0 ? 'items' : 'item'
					  } (${percentage}%)`}
			</em>
		</footer>
	);
}
