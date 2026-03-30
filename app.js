// Export data
document.getElementById('exportBtn').addEventListener('click', () => {
    const data = {
        products: products,
        orders: orders,
        invoices: invoices,
        ads: ads,
        banners: banners,
        users: users,
        chats: chats,
        version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `3dxo_backup_${new Date().toISOString().slice(0,19)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Data berhasil diekspor!');
});

// Import data
document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
});
document.getElementById('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const imported = JSON.parse(ev.target.result);
            if (confirm('Ini akan MENGGANTI semua data saat ini dengan data dari file. Lanjutkan?')) {
                if (imported.products) { products = imported.products; saveProducts(); }
                if (imported.orders) { orders = imported.orders; saveOrders(); }
                if (imported.invoices) { invoices = imported.invoices; saveInvoices(); }
                if (imported.ads) { ads = imported.ads; saveAds(); }
                if (imported.banners) { banners = imported.banners; saveBanners(); }
                if (imported.users) { users = imported.users; saveUsers(); }
                if (imported.chats) { chats = imported.chats; saveChats(); }
                // Refresh all panels
                renderProducts();
                renderOrders();
                renderProcessOrders();
                renderInvoices();
                renderAds();
                renderBanners();
                renderChat();
                alert('Import berhasil! Halaman akan di-refresh.');
                location.reload(); // reload to ensure all state updated
            }
        } catch (err) {
            alert('File tidak valid');
        }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset input
});
