class ItemService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async getAll() {
    const items = await this.itemRepository.getAll();

    return {
      statusCode: 200,
      data: items,
    };
  }

  async getById(id) {
    const item = await this.itemRepository.getById(id);

    if (item) {
      return {
        statusCode: 200,
        data: item,
      };
    } else {
      return {
        statusCode: 400,
        data: {
          status: "error",
          message: "Id tidak ditemukan",
        },
      };
    }
  }

  async create({ name, price }) {
    // validasi input
    console.log(typeof price);
    if (!name || !price || typeof price != "number") {
      return {
        statusCode: 400,
        data: {
          status: "Error",
          message: "Payload yang dikirim tidak sesuai, mohon diperiksa kembali",
        },
      };
    }

    let newData = {
      name: name,
      price: price,
    };

    const createdItem = await this.itemRepository.add(newData);
    return {
      statusCode: 200,
      data: createdItem,
    };
  }

  async update({ id, price }) {
    // validasi input id
    const findItem = await this.itemRepository.getById(id);
    if (!findItem) {
      return {
        statusCode: 400,
        data: {
          status: "Error",
          message: "Item tidak ditemukan, mohon diperiksa kembali",
        },
      };
    }

    let newData = {
      id: id,
      price: price,
    };

    const updatedItem = await this.itemRepository.update(newData);
    if (updatedItem > 0) {
      return {
        statusCode: 200,
        data: {
          status: "success",
          message: "Item berhasil diperbarui",
        },
      };
    } else {
      return {
        statusCode: 400,
        data: {
          status: "error",
          message: "Tidak ada data yang diperbarui",
        },
      };
    }
  }

  async delete(id) {
    const deletedItem = await this.itemRepository.delete(id);

    if (deletedItem == 1) {
      return {
        statusCode: 200,
        data: {
          status: "success",
          message: "Item berhasil dihapus",
        },
      };
    } else {
      return {
        statusCode: 400,
        data: {
          status: "error",
          message: "Id tidak ditemukan",
        },
      };
    }
  }
}

module.exports = ItemService;
