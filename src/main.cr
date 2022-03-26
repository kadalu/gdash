require "option_parser"

# Set VERSION during build time
VERSION = {{ env("VERSION") && env("VERSION") != "" ? env("VERSION") : `git describe --always --tags --match "[0-9]*" --dirty`.chomp.stringify }}

class Args
  class_property port = 8080, auth_file = "", gluster_binary_path = "", gluster_host = "", admins = Hash(String, String).new
end

def parse_args
  args = Args.new
  OptionParser.parse do |parser|
    parser.banner = "Usage: gluster-dashboard [arguments] HOSTNAME"
    parser.on("-p PORT", "--port=PORT", "Gluster Dashboard Port (Default is 8080)") { |port| Args.port = port.to_i }
    parser.on("-g PATH", "--gluster-binary=PATH", "Gluster binary path") { |path| Args.gluster_binary_path = path }
    parser.on("-a FILE", "--auth-file=FILE", "Users Credentials file. One user entry per row in the format <username>=<password_hash>") { |host| Args.gluster_host = host }
    parser.on("-v", "--version", "Show version information") do
      puts "Gluster Dashboard #{VERSION}"
      exit
    end

    parser.on("-h", "--help", "Show this help") do
      puts parser
      exit
    end

    parser.invalid_option do |flag|
      STDERR.puts "ERROR: #{flag} is not a valid option."
      STDERR.puts
      STDERR.puts parser
      exit 1
    end

    parser.unknown_args do |pargs|
      if pargs.size == 0
        STDERR.puts "ERROR: HOSTNAME is not provided."
        STDERR.puts
        STDERR.puts parser
        exit 1
      end
      Args.gluster_host = pargs[0]
    end
  end
end

def main
  parse_args

  if Args.auth_file != ""
    File.read_lines(Args.auth_file).each do |line|
      username, password_hash = line.strip.split("=")
      Args.admins[username] = password_hash
    end
  end
end

main
