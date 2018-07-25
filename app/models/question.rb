class Question < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :map, presence: true, format: { with: %r[\A(enpbrw)+\Z]}

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
    map.split('')
      .reduce([[]]) { |result, string|
        if string == TILES[:new_line]
          result << []
        else
          result.last << string
        end
        result
      }
  end

  def tile(x, y)
    line = map2array[y]
    line&[x]
  end

  def player_point
  end

  def player_move_up
  end

  def player_can_move_up?
  end

  #def player_move_down
  #end

  #def player_move_left
  #end

  #def player_move_right
  #end
end
