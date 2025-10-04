<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Alumni</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }
        h2, p {
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .address {
            font-size: 11px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        .empty-message {
            text-align: center;
            padding: 24px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Universitas Teknologi Akba Makassar</h2>
        <p class="address">Jl. Perintis Kemerdekaan, Tamalanrea, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 90245</p>
        <hr>
        <h3>Data Alumni</h3>
    </div>

    <table>
        <thead>
            <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Judul</th>
                <th>Angkatan</th>
            </tr>
        </thead>
        <tbody>
            @forelse($alumni as $item)
                <tr>
                    <td>{{ $item->nim }}</td>
                    <td><strong>{{ $item->nama }}</strong></td>
                    <td><strong>{{ $item->judul }}</strong></td>
                    <td><strong>{{ $item->tahun ?? '-' }}</strong></td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" class="empty-message">
                        <p>
                            @if ($hasActiveFilters)
                                Tidak ada alumni yang sesuai dengan filter.
                            @else
                                Tidak ada alumni yang ditemukan.
                            @endif
                        </p>

                        @if ($hasActiveFilters)
                            <p><em>(Filter aktif. Silakan hapus filter di tampilan web.)</em></p>
                        @endif
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
