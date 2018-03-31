import {observable, action, computed, createTransformer} from 'mobx';
import agent from "../../api/agent";
import searchStore from './searchStore';

const LIMIT = 20;

export class RoomsStore {
  @observable isLoading = false;
  @observable page = 0;
  @observable totalPagesCount = 0;
  @observable roomsRegistry = observable.map();
  @observable predicate = {};
  @observable menuOpen = observable.map();

  /** Transformer */
  isMenuOpenFor = createTransformer(id => {
    return this.menuOpen.has(id) && this.menuOpen.get(id).open
  });

  isMenuOptionsOpenFor = createTransformer(id => {
    return this.menuOpen.has(id) && this.menuOpen.get(id).openOptions
  });

  @computed get rooms() {
    return this.roomsRegistry.values();
  };

  roomsLook(rooms, ancestor = 0) {
    return rooms.filter((data) => {
      return parseInt(data.ancestor) === parseInt(ancestor);
    }).map((data) => {
      data.descendant = this.roomsLook(rooms, (data.id));
      return data;
    });
  }

  filterRooms(rooms) {
    return rooms.filter((data) => {
      return (data.title.indexOf(searchStore.text) !== -1) ||
        (data.description.indexOf(searchStore.text) !== -1);
    });
  }

  @computed get roomsIerarchy() {
    return this.roomsRegistry.values();
  };

  @computed get floatRooms() {
    const rooms = this.roomsRegistry.values();
    if (!rooms.length)
      return [];

    let reduce = (rooms, accumulator) => rooms.reduce((accumulator, room) => {
      const acc = reduce(room.descendant, accumulator);

      let data = {
        identifier: room.identifier,
        status: room.status,
        name: room.name
      };

      return acc.concat([data]);
    }, accumulator);

    return reduce(rooms, []);
  };

  clear() {
    this.roomsRegistry.clear();
    this.page = 0;
  }

  getRoom(slug) {
    return this.roomsRegistry.get(slug);
  }

  @action setPage(page) {
    this.page = page;
  }

  @action setPredicate(predicate) {
    if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return;

    this.clear();
    this.predicate = predicate;
  }

  $req() {
    return agent.Rooms.all(this.page, LIMIT, this.predicate);
  }

  @action loadRooms() {
    this.isLoading = true;

    return this.$req()
      .then(action(({items, pagination}) => {
        this.roomsRegistry.clear();
        items.forEach(room => {
          this.roomsRegistry.set(room.identifier, room)
        });
        this.totalPagesCount = Math.ceil(pagination.totalItems / pagination.limitItems);
      }))
      .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action loadRoomsSearch() {
    this.isLoading = true;
    return agent.Rooms.search(
      searchStore.text,
      searchStore.radioButtonType,
      this.page
    ).then(action(({items, pagination}) => {
      this.roomsRegistry.clear();

      items.forEach(room => {
        this.roomsRegistry.set(room.identifier, room)
      });
      this.totalPagesCount = Math.ceil(pagination.totalItems / pagination.limitItems);
    }))
    .finally(action(() => {
      this.isLoading = false;
    }));
  }

  @action loadRoom(identifier, {acceptCached = false} = {}) {
    this.isLoading = true;

    return agent.Rooms.get(identifier)
      .then(action((room) => {
        return room;
      }))
      .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action createRoom(room) {
    return agent.Rooms.create(room)
      .then(action((room) => {
        return room;
      }))
  }

  @action updateRoom(data) {
    return agent.Rooms.update(data)
      .then(action((room) => {
        return room;
      }))
  }

  @action deleteRoom(slug) {
  }

  // is open descendant menu
  @action toggleOpen(id) {
    return this.menuOpen.set(id, Object.assign(
      {},
      this.menuOpen.get(id),
      {open: !this.isMenuOpenFor(id)}
    ));
  }

  // is open options meny
  @action toggleOptions(id) {
    return this.menuOpen.set(id, Object.assign(
      {},
      this.menuOpen.get(id),
      {
        openOptions: !this.isMenuOptionsOpenFor(id)
      }
    ));
  }
}

export default new RoomsStore();
