class Question < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :map, presence: true
  validate :validate_map

  # TODO enum
  TILES = {
    empty: 'e',
    new_line: 'n',
    player: 'p',
    box: 'b',
    right_place: 'r',
    wall: 'w',
  }.freeze

  def map2array
    @arrayed_map ||= map.split('')
      .reduce([[]]) { |result, string|
        if string == TILES[:new_line]
          result << []
        else
          result.last << string
        end
        result
      }
  end

  def point(x:, y:, **)
    line = map2array[y]
    line.try(:[], x)
  end

  # 上の座標を返す
  def up_point(x:, y:, **)
    {x: x, y: y - 1}
  end

  def down_point(x:, y:)
    {x: x, y: y + 1}
  end

  def right_point(x:, y:)
    {x: x + 1, y: y}
  end

  def left_point(x:, y:)
    {x: x - 1, y: y}
  end

  def player_point
    x = nil
    y = map2array.index { |line| x = line.index(TILES[:player]) }
    {x: x, y: y}
  end

  def player_move_up!
    if player_can_up?
      old_player = {movable: TILES[:empty]}.merge player_point
      new_player = {movable: TILES[:player]}.merge up_point(player_point)
      move!(old_player)
      move!(new_player)
    elsif player_can_push_up?
      current_player = {movable: TILES[:empty]}.merge player_point
      box = {movable: TILES[:player]}.merge up_point(current_player)
      new_box = {movable: TILES[:box]}.merge up_point(box)
      move!(current_player)
      move!(box)
      move!(new_box)
    else
      nil
    end
  end

  def move!(x:, y:, movable:)
    map = map2array
    map[y][x] = movable
    map
  end

  def show
    map2array.each {|line|
      line.each {|tile| print tile}
      puts ''
    }
    nil
  end

  def player_can_up?
    tile = point(up_point(player_point))
    return tile == TILES[:empty]
  end

  # box がある場合の判定
  def player_can_push_up?
    tile = point(up_point(player_point))
    # boxの上がempty, right_placeならok
    if tile == TILES[:box]
      next_tile = point(up_point(up_point(player_point)))
      result = [TILES[:empty], TILES[:right_place]].include?(next_tile)
      return result
    end
    false
  end

  private

  def validate_map
    # 
    return true
  end
end
