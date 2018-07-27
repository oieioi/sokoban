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

  def tile(x:, y:, **)
    line = map2array[y]
    line.try(:[], x)
  end

  def up_point(x:, y:, **)
    {x: x, y: y - 1}
  end

  def down_point(x:, y:, **)
    {x: x, y: y + 1}
  end

  def right_point(x:, y:, **)
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

  %w[up down right left].each do |direction|
    define_method "player_move_#{direction}!" do
      if send("player_can_#{direction}?")
        current_player = {movable: TILES[:empty]}.merge player_point
        new_player = {movable: TILES[:player]}.merge send("#{direction}_point", player_point)
        replace!(current_player)
        replace!(new_player)
      elsif send("player_can_push_#{direction}?")
        current_player = {movable: TILES[:empty]}.merge player_point
        box = {movable: TILES[:player]}.merge send("#{direction}_point", current_player)
        new_box = {movable: TILES[:box]}.merge send("#{direction}_point", box)
        replace!(current_player)
        replace!(box)
        replace!(new_box)
      else
        nil
      end
    end

    # その方向に進めるか
    define_method "player_can_#{direction}?" do
      tile = tile(send("#{direction}_point", player_point))
      return tile == TILES[:empty]
    end

    # 押せるか
    define_method "player_can_push_#{direction}?" do
      tile = tile(send("#{direction}_point", player_point))
      # boxの上がempty, right_placeならok
      if tile == TILES[:box]
        next_tile = tile(send("#{direction}_point", send("#{direction}_point", player_point)))
        result = [TILES[:empty], TILES[:right_place]].include?(next_tile)
        return result
      end
      false
    end
  end

  def replace!(x:, y:, movable:)
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

  private

  def validate_map
    # TODO
    return true
  end
end
